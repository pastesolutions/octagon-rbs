<script setup lang="ts">
import type { Resource } from '~/types';

defineProps<{ item: Resource; actionLabel: string }>();
const emit = defineEmits<{ action: [item: Resource] }>();

const expanded = ref(false);
const descriptionId = useId();
</script>

<template>
    <!-- Карточка перестраивается по своей ширине (container queries), а не по ширине окна -->
    <div class="resource-wrap">
        <article class="resource">
            <div class="resource__media">
                <img v-if="item.image" :src="item.image" :alt="item.title" class="resource__image" loading="lazy">
                <div v-else class="resource__placeholder">
                    <AppIcon name="logo" :size="88" />
                </div>
                <span class="resource__role">{{ item.role }}</span>
            </div>

            <div class="resource__body">
                <div class="resource__text">
                    <h2 class="resource__title">{{ item.title }}</h2>
                    <p :id="descriptionId" class="resource__description" :class="{ 'resource__description--full': expanded }">
                        {{ item.description }}
                    </p>
                </div>
                <div class="resource__actions">
                    <AppButton @click="emit('action', item)">{{ actionLabel }}</AppButton>
                    <AppButton variant="secondary" :aria-expanded="expanded" :aria-controls="descriptionId" @click="expanded = !expanded">
                        {{ expanded ? 'Свернуть' : 'Подробнее' }}
                    </AppButton>
                </div>
            </div>
        </article>
    </div>
</template>

<style scoped>
.resource-wrap {
    container: resource / inline-size;
    height: 100%;
}

.resource {
    display: flex;
    height: 100%;
    min-height: 166px;
    overflow: hidden;
    border-radius: var(--radius-md);
    background: var(--color-surface);
}

.resource__media {
    position: relative;
    flex-shrink: 0;
    width: 166px;
    min-height: 166px;
}

.resource__image,
.resource__placeholder {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.resource__placeholder {
    display: grid;
    place-items: center;
    background: var(--color-accent);
    color: var(--color-white);
}

.resource__role {
    position: absolute;
    right: 10px;
    bottom: 10px;
    left: 10px;
    padding: 5px 8px;
    overflow: hidden;
    border-radius: 28px;
    background: var(--color-surface-glass);
    box-shadow: var(--shadow-soft);
    font: 600 var(--text-xs);
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.resource__body {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
    min-width: 0;
    padding: 10px 20px;
}

.resource__text {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;
}

.resource__title {
    font: 600 var(--text-2xl);
    overflow-wrap: anywhere;
}

.resource__description {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
}

.resource__description--full {
    display: block;
}

.resource__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

/* Кнопки делят строку, а если текст не помещается — переносятся, а не вылезают за карточку */
.resource__actions > * {
    flex: 1 1 auto;
    min-width: 0;
    padding-inline: 12px;
}

/* В узкой карточке фото компактнее, чтобы обе кнопки оставались в одной строке */
@container resource (max-width: 479px) {
    .resource__media {
        width: 120px;
    }

    .resource__body {
        padding: 10px 14px;
    }

    .resource__title {
        font: 600 var(--text-xl);
    }
}

@container resource (max-width: 359px) {
    .resource {
        flex-direction: column;
    }

    .resource__media {
        width: 100%;
        height: 200px;
    }

    .resource__role {
        right: auto;
        min-width: 146px;
    }

    .resource__body {
        padding: 16px;
    }
}
</style>
