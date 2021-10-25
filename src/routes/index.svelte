<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/books/random');

    if (res.ok) {
      return {
        props: {
          book: await res.json(),
        },
      };
    }

    return {
      status: res.status,
      error: new Error(`Could not load a random book`),
    };
  };
</script>

<script lang="ts">
  export let book;
</script>

<h2>Your random book is</h2>
<h3>{book.title}</h3>
<p>{book.author}</p>
<a
  target="#"
  href={`https://www.goodreads.com/search?q=${encodeURIComponent(
    `${book.title} ${book.author}`
  )}&search_type=books`}>Goodreads</a
>
