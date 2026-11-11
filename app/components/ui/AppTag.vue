<script setup lang="ts">
withDefaults(defineProps<{ size?: 'sm' | 'md' }>(), { size: 'md' });
</script>

<template>
    <span class="tag" :class="`tag--${size}`"><slot /></span>
</template>

<style scoped>
.tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 16px;
    border-radius: var(--radius-xs);
    background: var(--color-accent);
    color: var(--color-white);
    font: 700 var(--text-md);
    white-space: nowrap;
}

.tag--sm {
    font: 700 var(--text-sm);
}
</style>
