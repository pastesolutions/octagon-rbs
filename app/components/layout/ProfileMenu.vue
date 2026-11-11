<script setup lang="ts">
import { currentUser } from '~/utils/data';

const emit = defineEmits<{ close: [] }>();
</script>

<template>
    <div class="profile-menu">
        <div class="profile-menu__head">
            <p class="profile-menu__name">{{ currentUser.name }}</p>
            <button type="button" class="profile-menu__settings" aria-label="Настройки профиля" @click="emit('close')">
                <AppIcon name="settings" />
            </button>
        </div>
        <p class="profile-menu__email">{{ currentUser.email }}</p>
        <AppButton block @click="emit('close')">Выход</AppButton>
    </div>
</template>

<style scoped>
.profile-menu {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 173px;
    padding: 20px;
    border-radius: var(--radius-md);
    background: var(--color-white);
    box-shadow: var(--shadow-soft);
    color: var(--color-text);
}

.profile-menu__head {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
}

.profile-menu__name {
    font: 600 var(--text-lg);
    white-space: nowrap;
}

.profile-menu__settings {
    display: inline-flex;
    padding: 2px;
    border: 0;
    border-radius: 4px;
    background: none;
    cursor: pointer;
    transition: color 0.15s, transform 0.3s;
}

.profile-menu__settings:hover {
    color: var(--color-primary);
    transform: rotate(45deg);
}

.profile-menu__settings:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
}

.profile-menu__email {
    font: 400 var(--text-md);
}
</style>
