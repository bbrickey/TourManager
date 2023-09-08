/** @type {import('next').NextConfig} */

module.exports = {
    experimental: {
      serverActions: true,
    },
   webpack: (config) => {
      config.externals = [...config.externals, 'bcrypt'];
      return config;
      },
  }
