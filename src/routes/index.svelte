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

<div class="h-full container pt-8 mx-auto items-center max-w-4xl px-16">
  <h2 class="my-4 text-3xl text-center font-bold leading-tight">
    Your random book is
  </h2>

  <div class="flex h-80  gap-8 border border-l-0 rounded-lg">
    <div class="w-96 bg-gray-300">
      <img
        class="rounded-l-lg"
        style="height: 100%; width: 100%; object-fit: cover"
        src={book.cover.large}
        alt="cover of the book"
      />
    </div>
    <div class="flex flex-col w-full justify-between h-full py-8 pr-8">
      <div>
        <p class="text-3xl">
          {book.title}
          <span class="text-xl text-gray-600">
            by {book.authors?.map((author) => author.name).join(', ')}
          </span>
        </p>
      </div>
      <div class="w-full flex justify-end">
        <a
          class="hover:text-blue-400 text-lg text-gray-700"
          target="#"
          href={`https://www.goodreads.com/search?q=${encodeURIComponent(
            `${book.identifiers.isbn_10 || book.identifiers.isbn_13}`
          )}&search_type=books`}>Goodreads</a
        >
      </div>
    </div>
  </div>
</div>
