<script setup lang="ts">
const emit = defineEmits<{ auth: [mode: 'login' | 'register'] }>();
</script>

<template>
    <header class="hero">
        <div class="hero__content container">
            <div class="hero__brand">
                <AppIcon name="logo" class="hero__logo" />
                <p class="hero__abbr" aria-hidden="true">СБР</p>
                <h1 class="hero__title">Сервис бронирования ресурсов</h1>
            </div>

            <div class="hero__actions">
                <button type="button" class="hero__button" @click="emit('auth', 'login')">Вход</button>
                <button type="button" class="hero__button" @click="emit('auth', 'register')">Регистрация</button>
            </div>

            <p class="hero__text">
                Рыбатекст используется дизайнерами, проектировщиками и фронтендерами, когда нужно быстро заполнить макеты
                или прототипы содержимым. Это тестовый контент, который не должен нести никакого смысла, лишь показать
                наличие самого текста или продемонстрировать типографику в деле.
            </p>
        </div>

        <SiteNav />
    </header>
</template>

<style scoped>
.hero {
    position: relative;
    display: flex;
    flex-direction: column;
    background: #1d2a22 url('~/assets/images/hero.jpg') center / cover no-repeat;
    color: var(--color-white);
}

.hero__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: clamp(40px, 11.6vw, 223px);
    padding-bottom: clamp(32px, 4.9vw, 94px);
    text-align: center;
}

.hero__brand {
    display: flex;
    align-items: center;
}

.hero__logo {
    width: clamp(96px, 14.9vw, 286px) !important;
    height: clamp(96px, 14.9vw, 286px) !important;
}

.hero__abbr,
.hero__title {
    margin-top: clamp(0px, 2.2vw, 42px);
}

.hero__abbr {
    font: 600 clamp(56px, 6.67vw, 128px) / 1.37 var(--font-base);
}

.hero__title {
    max-width: 12.5em;
    margin-left: clamp(16px, 3.3vw, 63px);
    font: 400 clamp(28px, 3.33vw, 64px) / 1.36 var(--font-base);
    text-align: left;
}

.hero__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: clamp(16px, 1.67vw, 32px);
    margin-top: clamp(16px, 1.4vw, 27px);
}

.hero__button {
    padding: clamp(6px, 0.52vw, 10px) clamp(32px, 3.125vw, 60px);
    border: 0;
    border-radius: var(--radius-pill);
    background: var(--color-white);
    color: var(--color-text);
    box-shadow: var(--shadow-glow);
    font: 600 clamp(20px, 1.67vw, 32px) / 1.375 var(--font-base);
    cursor: pointer;
    transition: background-color 0.15s, box-shadow 0.15s, transform 0.15s;
}

.hero__button:hover {
    background: var(--color-slot);
    box-shadow: 0 0 24px rgba(255, 255, 255, 0.7);
}

.hero__button:active {
    transform: scale(0.98);
}

.hero__button:focus-visible {
    outline: 3px solid var(--color-accent);
    outline-offset: 3px;
}

.hero__text {
    max-width: 921px;
    margin-top: clamp(32px, 6.5vw, 124px);
    font: 600 clamp(16px, 1.25vw, 24px) / 1.375 var(--font-base);
}

@media (max-width: 767px) {
    .hero__brand {
        flex-wrap: wrap;
        justify-content: center;
    }

    .hero__title {
        flex-basis: 100%;
        max-width: none;
        margin: 8px 0 0;
        text-align: center;
    }
}
</style>
