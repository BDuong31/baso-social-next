import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
const isBrowser = typeof window !== 'undefined';

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'vi'],
        fallbackLng: 'en',
        debug: process.env.NODE_ENV === 'development',
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: '/locales/{{lng}}/common.json', // Đặt file dịch trong thư mục public/locales/
        },
        detection: {
            order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
            caches: ['cookie'],
            lookupQuerystring: 'lng',
            lookupCookie: 'i18next',
            lookupLocalStorage: isBrowser ? 'i18nextLng' : undefined,
            excludeCacheFor: ['cimode'],
            cookieMinutes: 10,
            cookieDomain: process.env.NODE_ENV === 'production' ? 'yourdomain.com' : undefined,
            htmlTag: isBrowser ? document.documentElement : undefined,
            cookieOptions: { path: '/' },
        },
    });

export default i18n;
