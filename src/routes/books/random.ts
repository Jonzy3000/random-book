import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
  return {
    status: 200,
    body: JSON.stringify({
      hello: 'world',
    }),
  };
};
