
import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';

export default {
  kit: {
    adapter: adapter({
      fallback: 'index.html',
      strict: false
    }),
    paths: {
      base: dev ? '' : '/svelte-project-4c-Rene711',
    }
  }
};

