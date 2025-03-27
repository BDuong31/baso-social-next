/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'en',
    localeDetection: false,
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
      'lh3.googleusercontent.com',
      'basospark.youthscience.club',
    ],
  },
  output: 'standalone',
};

export default nextConfig;
