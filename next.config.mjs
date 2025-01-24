/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'en',
  },
  images: {
    domains: [
      'plus.unsplash.com',
      'images.unsplash.com',
      'i.pinimg.com',
      'i.pravatar.cc',
      'localhost',
      'dns.bento.showcase.200lab.io',
      'statics.cdn.200lab.io',
    ],
  },
  output: 'standalone',
};

export default nextConfig;
