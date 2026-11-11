export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    css: ['~/assets/css/tokens.css', '~/assets/css/main.css'],
    components: [{ path: '~/components', pathPrefix: false }],
    app: {
        // Для GitHub Pages (https://<user>.github.io/<repo>/) base задаётся переменной NUXT_APP_BASE_URL при сборке
        head: {
            htmlAttrs: { lang: 'ru' },
            titleTemplate: '%s · СБР',
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: 'СБР — сервис бронирования ресурсов: пространства, аппаратура и люди.' }
            ],
            link: [
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700&display=swap' }
            ]
        }
    }
});
