<script setup lang="ts">
import { currentUser } from '~/utils/data';

const links = [
    { to: '/equipment', label: 'Аппаратура' },
    { to: '/people', label: 'Люди' },
    { to: '/', label: 'Пространство' }
];

const route = useRoute();
const menuOpen = ref(false);
const profileOpen = ref(false);
const profile = ref<HTMLElement | null>(null);
const menuId = useId();
const profileId = useId();

watch(() => route.path, () => {
    menuOpen.value = false;
    profileOpen.value = false;
});

function onDocumentClick(event: MouseEvent) {
    if (profileOpen.value && !profile.value?.contains(event.target as Node)) profileOpen.value = false;
}

function onKeydown(event: KeyboardEvent) {
    if (event.key !== 'Escape') return;
    if (profileOpen.value) {
        profileOpen.value = false;
        profile.value?.querySelector<HTMLElement>('.nav__profile')?.focus();
    }
    menuOpen.value = false;
}

onMounted(() => document.addEventListener('click', onDocumentClick));
onBeforeUnmount(() => document.removeEventListener('click', onDocumentClick));
</script>

<template>
    <nav class="nav" aria-label="Основное меню" @keydown="onKeydown">
        <div class="nav__bar">
            <NuxtLink to="/" class="nav__home" aria-label="СБР — на главную">
                <AppIcon name="logo" :size="64" class="nav__logo" />
            </NuxtLink>

            <div class="nav__right">
                <button
                    type="button"
                    class="nav__burger"
                    :aria-expanded="menuOpen"
                    :aria-controls="menuId"
                    :aria-label="menuOpen ? 'Закрыть меню' : 'Открыть меню'"
                    @click="menuOpen = !menuOpen"
                >
                    <AppIcon :name="menuOpen ? 'close' : 'menu'" :size="28" />
                </button>

                <ul :id="menuId" class="nav__list" :class="{ 'nav__list--open': menuOpen }">
                    <li v-for="link in links" :key="link.to">
                        <NuxtLink :to="link.to" class="nav__link" active-class="" exact-active-class="nav__link--active">
                            {{ link.label }}
                        </NuxtLink>
                    </li>
                </ul>

                <div ref="profile" class="nav__profile-wrap">
                    <button
                        type="button"
                        class="nav__profile"
                        :aria-expanded="profileOpen"
                        :aria-controls="profileId"
                        @click="profileOpen = !profileOpen"
                    >
                        <span class="nav__link nav__profile-label" :class="{ 'nav__link--active': profileOpen }">Профиль</span>
                        <img :src="currentUser.avatar" alt="" class="nav__avatar" width="54" height="54">
                        <span class="visually-hidden">{{ currentUser.name }}</span>
                    </button>
                    <ProfileMenu v-show="profileOpen" :id="profileId" class="nav__menu" @close="profileOpen = false" />
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.nav {
    position: relative;
    z-index: 20;
    padding: 10px 50px;
    background: var(--color-nav);
}

.nav__bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
}

.nav__home {
    display: inline-flex;
    border-radius: var(--radius-sm);
    color: var(--color-white);
    transition: opacity 0.15s;
}

.nav__home:hover {
    opacity: 0.8;
}

.nav__home:focus-visible,
.nav__burger:focus-visible,
.nav__profile:focus-visible,
.nav__link:focus-visible {
    outline: 2px solid var(--color-white);
    outline-offset: 4px;
}

.nav__right {
    display: flex;
    align-items: center;
    gap: clamp(65px, 7vw, 134px);
}

.nav__list {
    display: flex;
    align-items: center;
    gap: clamp(65px, 7vw, 134px);
}

.nav__link {
    display: inline-block;
    padding: 5px 0;
    border-bottom: 1px solid transparent;
    color: rgba(255, 255, 255, 0.85);
    font: 600 var(--text-2xl);
    text-decoration: none;
    white-space: nowrap;
    transition: color 0.15s, border-color 0.15s;
}

.nav__link:hover {
    color: var(--color-white);
    border-bottom-color: rgba(255, 255, 255, 0.5);
}

.nav__link--active {
    color: var(--color-white);
    border-bottom-color: var(--color-white);
}

.nav__profile-wrap {
    position: relative;
}

.nav__profile {
    display: flex;
    align-items: center;
    gap: 37px;
    padding: 0;
    border: 0;
    border-radius: var(--radius-sm);
    background: none;
    cursor: pointer;
}

.nav__profile:hover .nav__link {
    color: var(--color-white);
    border-bottom-color: rgba(255, 255, 255, 0.5);
}

.nav__avatar {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    object-fit: cover;
}

.nav__menu {
    position: absolute;
    top: calc(100% + 7px);
    right: 0;
}

.nav__burger {
    display: none;
    padding: 6px;
    border: 0;
    border-radius: var(--radius-sm);
    background: none;
    color: var(--color-white);
    cursor: pointer;
}

.nav__burger:hover {
    background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 1279px) {
    .nav {
        padding: 10px var(--gutter);
    }

    .nav__right,
    .nav__profile {
        gap: 24px;
    }

    .nav__list {
        gap: 32px;
    }

    .nav__link {
        font: 600 var(--text-xl);
    }
}

@media (max-width: 1023px) {
    .nav__logo {
        width: 48px !important;
        height: 48px !important;
    }

    .nav__right {
        gap: 12px;
    }

    .nav__burger {
        display: inline-flex;
        order: 2;
    }

    .nav__list {
        position: absolute;
        top: 100%;
        right: 0;
        left: 0;
        display: none;
        flex-direction: column;
        align-items: stretch;
        gap: 0;
        padding: 8px var(--gutter) 16px;
        background: var(--color-nav);
    }

    .nav__list--open {
        display: flex;
    }

    .nav__list .nav__link {
        display: block;
        padding: 12px 0;
    }

    .nav__profile-label {
        display: none;
    }

    .nav__avatar {
        width: 44px;
        height: 44px;
    }
}
</style>
