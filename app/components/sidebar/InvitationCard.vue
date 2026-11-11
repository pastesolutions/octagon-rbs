<script setup lang="ts">
import type { Invitation } from '~/types';

defineProps<{ invitation: Invitation }>();
const emit = defineEmits<{ decline: [id: number] }>();

const expanded = ref(false);
const detailsId = useId();
</script>

<template>
    <article class="invitation">
        <h3 class="invitation__title">{{ invitation.title }}</h3>
        <ul class="invitation__tags">
            <li><AppTag>{{ invitation.time }}</AppTag></li>
            <li><AppTag>{{ invitation.organizer }}</AppTag></li>
            <li><AppTag>{{ invitation.role }}</AppTag></li>
        </ul>
        <p v-show="expanded" :id="detailsId" class="invitation__details">
            Место: {{ invitation.place }}. Организатор: {{ invitation.organizer }}
        </p>
        <div class="invitation__actions">
            <AppButton :aria-expanded="expanded" :aria-controls="detailsId" @click="expanded = !expanded">
                {{ expanded ? 'Скрыть' : 'Подробнее' }}
            </AppButton>
            <AppButton variant="secondary" @click="emit('decline', invitation.id)">Отклонить</AppButton>
        </div>
    </article>
</template>

<style scoped>
.invitation {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 30px;
    border-radius: var(--radius-md);
    background: var(--color-surface);
}

.invitation__title {
    font: 600 var(--text-lg);
}

.invitation__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.invitation__details {
    color: var(--color-text-muted);
}

.invitation__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

@media (max-width: 1439px) {
    .invitation {
        padding: 20px;
    }
}
</style>
