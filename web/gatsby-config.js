const dotenv = require('dotenv');

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = {
  flags: {
    DEV_SSR: true,
  },
  plugins: ['gatsby-plugin-pnpm', 'gatsby-plugin-root-import'],
};
