import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io'], // autorise les images de Sanity, important pour le bon fonctionnement du site
  },
};

export default nextConfig;
