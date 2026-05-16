/** @type {import('next').NextConfig} */
const nextConfig = {
  // Expose the API URL to the browser
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001',
  },
};

export default nextConfig;
