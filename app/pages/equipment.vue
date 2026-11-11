<script setup lang="ts">
import type { Resource } from '~/types';
import { equipment } from '~/utils/data';

definePageMeta({ compact: true });
useHead({ title: 'Аппаратура' });

const { openBooking } = useBooking();

function book(item: Resource) {
    openBooking({ mode: 'existing', place: item.title });
}
</script>

<template>
    <ResourceCatalog :items="equipment" title="Аппаратура" action-label="Забронировать" @action="book" @add="openBooking({ mode: 'new' })" />
</template>
