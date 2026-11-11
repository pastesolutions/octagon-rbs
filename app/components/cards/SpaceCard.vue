<script setup lang="ts">
import type { Space } from '~/types';

defineProps<{ space: Space }>();
const emit = defineEmits<{ book: [space: Space, slots: string[]] }>();

const view = ref<'photo' | 'info'>('photo');
const slots = ref<string[]>([]);
const titleId = useId();
const infoId = useId();
</script>

<template>
    <article class="space" :aria-labelledby="titleId">
        <div class="space__media">
            <img :src="space.image" :alt="`Фото: ${space.title}`" class="space__image" loading="lazy">

            <div class="space__tabs" role="group" aria-label="Режим просмотра">
                <button type="button" class="space__tab" :aria-pressed="view === 'photo'" @click="view = 'photo'">Фото</button>
                <button type="button" class="space__tab" :aria-pressed="view === 'info'" :aria-controls="infoId" @click="view = 'info'">Информация</button>
            </div>

            <div v-show="view === 'info'" :id="infoId" class="space__info">
                <p>{{ space.description }}</p>
                <dl class="space__facts">
                    <div><dt>Вместимость:</dt> <dd>до {{ space.capacity }} человек</dd></div>
                    <div><dt>Адрес:</dt> <dd>{{ space.address }}</dd></div>
                </dl>
            </div>

            <h2 :id="titleId" class="space__title">{{ space.title }}</h2>
        </div>

        <div class="space__panel">
            <TimeSlotPicker v-model="slots" :label="`Время бронирования: ${space.title}`" class="space__slots" />
            <div class="space__actions">
                <AppButton @click="emit('book', space, slots)">Забронировать</AppButton>
                <AppButton variant="secondary" :aria-controls="infoId" @click="view = view === 'info' ? 'photo' : 'info'">
                    {{ view === 'info' ? 'Скрыть' : 'Подробнее' }}
                </AppButton>
            </div>
        </div>
    </article>
</template>

<style scoped>
.space {
    overflow: hidden;
    border-radius: var(--radius-md);
    background: var(--color-surface);
}

.space__media {
    position: relative;
    height: 260px;
}

.space__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.space__tabs {
    position: absolute;
    top: 17px;
    left: 16px;
    z-index: 2;
    display: flex;
    gap: 24px;
}

.space__tab {
    padding: 8px 25px;
    border: 0;
    border-radius: var(--radius-sm);
    background: var(--color-white);
    font: 400 var(--text-md);
    cursor: pointer;
    transition: background-color 0.15s, color 0.15s;
}

.space__tab:hover {
    background: var(--color-slot);
}

.space__tab[aria-pressed='true'] {
    color: var(--color-primary);
    font-weight: 700;
}

.space__tab:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
}

.space__info {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    padding: 64px 24px 72px;
    background: rgba(242, 242, 242, 0.92);
    font: 400 var(--text-lg);
}

.space__facts {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin: 0;
}

.space__facts dt {
    display: inline;
    font-weight: 700;
}

.space__facts dd {
    display: inline;
    margin: 0;
}

.space__title {
    position: absolute;
    bottom: 13px;
    left: 10px;
    z-index: 2;
    padding: 8px 20px;
    border-radius: var(--radius-xs);
    background: var(--color-white);
    font: 600 var(--text-xl);
}

.space__panel {
    display: flex;
    align-items: flex-start;
    gap: 30px;
    padding: 16px;
}

.space__slots {
    flex: 1;
}

.space__actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 204px;
    flex-shrink: 0;
}

@media (max-width: 1023px) {
    .space__panel {
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
    }

    .space__actions {
        flex-direction: row;
        width: auto;
    }

    .space__actions > * {
        flex: 1;
    }
}

@media (max-width: 767px) {
    .space__media {
        height: 220px;
    }

    .space__tabs {
        top: 12px;
        left: 12px;
        gap: 8px;
    }

    .space__tab {
        padding: 6px 16px;
    }

    .space__title {
        font: 600 var(--text-lg);
        padding: 6px 14px;
    }

    .space__info {
        padding: 56px 16px 60px;
        font: 400 var(--text-md);
    }

    .space__actions {
        flex-direction: column;
    }
}
</style>
