import tsconfigPaths from 'vite-tsconfig-paths';

export default {
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      provider: 'v8',
    },
    globals: true,
  },
};
