/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

// next.config.js

module.exports = {
    // ... (other config options)
  
    // Enable server-side rendering for dynamic routes
    async rewrites() {
      return [
        {
          source: "/blog-details/:title",
          destination: "/blog-details/[title]",
        },
      ];
    },
  };
  