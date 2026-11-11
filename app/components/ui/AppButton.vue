<script setup lang="ts">
withDefaults(defineProps<{
    variant?: 'primary' | 'secondary';
    type?: 'button' | 'submit';
    disabled?: boolean;
    block?: boolean;
}>(), {
    variant: 'primary',
    type: 'button'
});
</script>

<template>
    <button :type="type" class="btn" :class="[`btn--${variant}`, { 'btn--block': block }]" :disabled="disabled">
        <slot />
    </button>
</template>

<style scoped>
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-height: 39px;
    padding: 10px 30px;
    border: 0;
    border-radius: var(--radius-sm);
    font: 400 var(--text-md);
    white-space: nowrap;
    cursor: pointer;
    transition: background-color 0.15s, box-shadow 0.15s, color 0.15s;
}

.btn--block {
    width: 100%;
}

.btn:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
}

.btn:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.btn--primary {
    background: var(--color-primary);
    color: var(--color-white);
    font-weight: 700;
}
.btn--primary:hover:not(:disabled) {
    background: var(--color-primary-hover);
}
.btn--primary:active:not(:disabled) {
    background: var(--color-primary-active);
}

.btn--secondary {
    background: var(--color-white);
    color: var(--color-text);
    box-shadow: var(--shadow-soft);
}
.btn--secondary:hover:not(:disabled) {
    background: var(--color-slot);
}
.btn--secondary:active:not(:disabled) {
    background: var(--color-slot-hover);
}
.btn--secondary:focus-visible {
    box-shadow: var(--focus-ring);
}
</style>
