<script setup lang="ts">
const { errorMessage } = useBooking();

const open = computed({
    get: () => errorMessage.value !== null,
    set: (value) => { if (!value) errorMessage.value = null; }
});
</script>

<template>
    <AppModal v-model="open" title="Ошибка" size="sm" centered>
        <p class="error-text" role="alert">{{ errorMessage }}</p>
        <AppButton block class="error-action" @click="open = false">Принять</AppButton>
    </AppModal>
</template>

<style scoped>
.error-text {
    font: 400 var(--text-md);
}

.error-action {
    font-size: 16px;
}
</style>
