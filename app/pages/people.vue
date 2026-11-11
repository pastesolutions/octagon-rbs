<script setup lang="ts">
import type { Resource } from '~/types';
import { people } from '~/utils/data';

definePageMeta({ compact: true });
useHead({ title: 'Люди' });

const { openBooking } = useBooking();

function invite(person: Resource) {
    openBooking({ mode: 'new', people: [person.title] });
}
</script>

<template>
    <ResourceCatalog :items="people" title="Люди" action-label="Пригласить" @action="invite" @add="openBooking({ mode: 'new' })" />
</template>
