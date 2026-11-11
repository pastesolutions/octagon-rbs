<script setup lang="ts">
const route = useRoute();
const authMode = ref<'login' | 'register' | null>(null);
</script>

<template>
    <div class="layout">
        <a href="#main" class="skip-link">Перейти к содержимому</a>
        <SiteHero @auth="authMode = $event" />

        <div class="layout__body container" :class="{ 'layout__body--compact': route.meta.compact }">
            <main id="main" class="layout__main" tabindex="-1">
                <slot />
            </main>
            <AppSidebar />
        </div>

        <BookingModal />
        <AuthModal v-model="authMode" />
        <ErrorModal />
    </div>
</template>

<style scoped>
.layout__body {
    display: grid;
    grid-template-columns: minmax(0, 1fr) var(--aside);
    align-items: start;
    gap: 56px;
    padding-top: 56px;
    padding-bottom: 80px;
}

.layout__body--compact {
    padding-top: 26px;
}

.layout__main:focus {
    outline: none;
}

@media (max-width: 1439px) {
    .layout__body {
        gap: 32px;
    }
}

@media (max-width: 1023px) {
    .layout__body,
    .layout__body--compact {
        grid-template-columns: minmax(0, 1fr);
        gap: 40px;
        padding-top: 32px;
        padding-bottom: 48px;
    }
}

@media (min-width: 768px) and (max-width: 1023px) {
    .layout__body :deep(.sidebar) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: start;
        gap: 24px;
    }
}
</style>
