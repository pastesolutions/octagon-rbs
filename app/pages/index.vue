<script setup lang="ts">
import type { Space } from '~/types';
import { currentUser, spaces } from '~/utils/data';

useHead({ title: 'Пространство' });

const { openBooking } = useBooking();

function book(space: Space, slots: string[]) {
    openBooking({ mode: 'existing', place: space.title, slots, people: [currentUser.name] });
}
</script>

<template>
    <section class="spaces">
        <h1 class="visually-hidden">Пространства для бронирования</h1>
        <ul class="spaces__list">
            <li v-for="space in spaces" :key="space.id">
                <SpaceCard :space="space" @book="book" />
            </li>
        </ul>
    </section>
</template>

<style scoped>
.spaces__list {
    display: flex;
    flex-direction: column;
    gap: 45px;
}

@media (max-width: 767px) {
    .spaces__list {
        gap: 24px;
    }
}
</style>
