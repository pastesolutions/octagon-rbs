<script setup lang="ts">
import type { Resource } from '~/types';

const props = defineProps<{ items: Resource[]; title: string; actionLabel: string }>();
const emit = defineEmits<{ action: [item: Resource]; add: [] }>();

const { search, sort, visible } = useResourceList(props.items);
</script>

<template>
    <section class="catalog">
        <h1 class="visually-hidden">{{ title }}</h1>
        <ListToolbar v-model:search="search" v-model:sort="sort" :search-label="`Поиск: ${title.toLowerCase()}`" @add="emit('add')" />

        <p class="visually-hidden" aria-live="polite">Найдено: {{ visible.length }}</p>

        <ul v-if="visible.length" class="catalog__grid">
            <li v-for="item in visible" :key="item.id">
                <ResourceCard :item="item" :action-label="actionLabel" @action="emit('action', $event)" />
            </li>
        </ul>

        <div v-else class="catalog__empty">
            <p>По запросу «{{ search }}» ничего не найдено</p>
            <AppButton variant="secondary" @click="search = ''">Сбросить поиск</AppButton>
        </div>
    </section>
</template>

<style scoped>
.catalog {
    container: catalog / inline-size;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

/* Максимум две колонки, как в макете; одна — когда карточке не хватает 340px */
.catalog__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(max(340px, calc((100% - 30px) / 2)), 100%), 1fr));
    gap: 30px;
}

.catalog__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 48px 24px;
    border-radius: var(--radius-md);
    background: var(--color-surface);
    text-align: center;
}

@container catalog (max-width: 1009px) {
    .catalog__grid {
        gap: 20px;
    }
}

@media (max-width: 767px) {
    .catalog {
        gap: 20px;
    }
}
</style>
