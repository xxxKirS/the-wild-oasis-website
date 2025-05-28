import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [process.env.SUPABASE_DOMAIN!], // <- your Supabase project domain
  },
};

export default nextConfig;
