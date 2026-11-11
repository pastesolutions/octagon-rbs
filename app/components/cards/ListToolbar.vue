<script setup lang="ts">
import type { SortOption } from '~/types';

defineProps<{ searchLabel: string; addLabel?: string }>();
const emit = defineEmits<{ add: [] }>();
const search = defineModel<string>('search', { default: '' });
const sort = defineModel<SortOption>('sort', { default: 'default' });

const searchId = useId();
const sortId = useId();
</script>

<template>
    <div class="toolbar" role="search">
        <div class="toolbar__group">
            <div class="toolbar__control">
                <label :for="searchId" class="visually-hidden">{{ searchLabel }}</label>
                <input :id="searchId" v-model="search" type="search" class="toolbar__input" placeholder="Поиск" autocomplete="off">
                <AppIcon name="search" :size="18" />
            </div>

            <div class="toolbar__control toolbar__control--select">
                <AppIcon name="sort" />
                <label :for="sortId" class="visually-hidden">Сортировка</label>
                <select :id="sortId" v-model="sort" class="toolbar__select">
                    <option v-for="option in SORT_OPTIONS" :key="option.value" :value="option.value">{{ option.label }}</option>
                </select>
                <AppIcon name="chevron-down" />
            </div>
        </div>

        <button type="button" class="toolbar__control toolbar__add" @click="emit('add')">
            {{ addLabel ?? 'Добавить' }}
            <AppIcon name="plus" />
        </button>
    </div>
</template>

<style scoped>
.toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px 20px;
}

.toolbar__group {
    display: flex;
    flex: 0 1 486px;
    gap: 20px;
    min-width: 0;
}

.toolbar__control {
    position: relative;
    display: flex;
    flex: 1 1 0;
    align-items: center;
    justify-content: space-between;
    gap: 11px;
    min-width: 0;
    max-width: 233px;
    min-height: 43px;
    padding: 12px 16px;
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    background: var(--color-surface);
    font: 400 var(--text-md);
    letter-spacing: -0.01em;
    transition: border-color 0.15s, background-color 0.15s;
}

.toolbar__control:hover {
    border-color: var(--color-accent);
}

.toolbar__control:focus-within {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 1px var(--color-primary);
}

.toolbar__input,
.toolbar__select {
    flex: 1;
    min-width: 0;
    padding: 0;
    border: 0;
    background: none;
    outline: none;
}

.toolbar__input::placeholder {
    color: var(--color-placeholder);
}

.toolbar__input::-webkit-search-cancel-button {
    cursor: pointer;
}

.toolbar__control--select {
    gap: 12px;
}

.toolbar__select {
    position: absolute;
    inset: 0;
    padding: 0 40px 0 64px;
    appearance: none;
    cursor: pointer;
}

.toolbar__control--select .icon:last-child {
    margin-left: auto;
}

.toolbar__select {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.toolbar__add {
    flex: 0 0 165px;
    margin-left: auto;
    cursor: pointer;
}

.toolbar__add:focus-visible {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 1px var(--color-primary);
}

/* Когда три элемента не помещаются в строку: поиск и сортировка — на всю ширину, «Добавить» — ниже */
@container catalog (max-width: 699px) {
    .toolbar__group {
        flex-basis: 100%;
        gap: 12px;
    }

    .toolbar__control {
        max-width: none;
    }

    .toolbar__add {
        flex: 1 1 100%;
    }
}

@container catalog (max-width: 419px) {
    .toolbar__group {
        flex-direction: column;
    }
}
</style>
