const dotenv = require('dotenv');

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = {
  plugins: ['gatsby-plugin-pnpm', 'gatsby-plugin-root-import'],
};
