<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{ error: NuxtError }>();
const isNotFound = computed(() => props.error.statusCode === 404);

useHead({ title: () => (isNotFound.value ? 'Страница не найдена' : 'Ошибка') });
</script>

<template>
    <main class="error-page">
        <div class="error-page__card">
            <AppIcon name="logo" :size="96" class="error-page__logo" />
            <p class="error-page__code">{{ error.statusCode }}</p>
            <h1 class="error-page__title">{{ isNotFound ? 'Страница не найдена' : 'Что-то пошло не так' }}</h1>
            <AppButton @click="clearError({ redirect: '/' })">Вернуться на главную</AppButton>
        </div>
    </main>
</template>

<style scoped>
.error-page {
    display: grid;
    place-items: center;
    min-height: 100vh;
    padding: 16px;
    background: #1d2a22 url('~/assets/images/hero.jpg') center / cover no-repeat;
}

.error-page__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: min(420px, 100%);
    padding: 32px;
    border-radius: var(--radius-md);
    background: var(--color-surface);
    text-align: center;
}

.error-page__logo {
    color: var(--color-primary);
}

.error-page__code {
    font: 600 var(--text-3xl);
    color: var(--color-primary);
}

.error-page__title {
    font: 600 var(--text-2xl);
}
</style>
