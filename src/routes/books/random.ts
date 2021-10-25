import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
  const api =
    'https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=Rj71AIlkian8S4hL8DLzUKLRHPBPZSpW';

  const numberOfBooks =
    (await fetch(`${api}&offset=0`)
      .then((res) => res.json())
      .then((res) => res.num_results)) || 30000;

  console.log(numberOfBooks);

  const randomBookNumber = Math.round(Math.random() * numberOfBooks);
  const randomOffset = randomBookNumber - (randomBookNumber % 20);

  console.log('Fetching page', randomOffset);

  const books = await fetch(`${api}&offset=${randomOffset}`)
    .then((res) => res.json())
    .then((res) => res.results);

  const randomBookInList = Math.round(Math.random() * (books.length - 1));
  console.log('Using book', randomBookInList);
  const book = books[randomBookInList];

  return {
    status: 200,
    body: JSON.stringify({
      hello: 'world',
      ...book,
    }),
    headers: {
      'Cache-Control': 'public, max-age=5',
    },
  };
};
