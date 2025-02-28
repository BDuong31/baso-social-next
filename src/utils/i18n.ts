import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
const isBrowser = typeof document !== 'undefined';

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'vi'],
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: '/locales/{{lng}}/common.json',
        },
        detection: {
            order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
            caches: ['cookie'],
            lookupQuerystring: 'lng',
            lookupCookie: 'i18next',
            lookupLocalStorage: 'i18nextLng',
            excludeCacheFor: ['cimode'],
            cookieMinutes: 10,
            cookieDomain: 'localhost',
            htmlTag: isBrowser ? document.documentElement : undefined, // 👈 Kiểm tra trước khi sử dụng
            cookieOptions: { path: '/' },
        },
    });

export default i18n;
