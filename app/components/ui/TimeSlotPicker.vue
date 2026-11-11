<script setup lang="ts">
import { TIME_SLOTS } from '~/utils/data';

withDefaults(defineProps<{ label: string; size?: 'md' | 'lg' }>(), { size: 'md' });
const selected = defineModel<string[]>({ default: () => [] });

function toggle(slot: string) {
    selected.value = selected.value.includes(slot)
        ? selected.value.filter((item) => item !== slot)
        : [...selected.value, slot];
}
</script>

<template>
    <ul class="slots" :class="`slots--${size}`" role="group" :aria-label="label">
        <li v-for="slot in TIME_SLOTS" :key="slot">
            <button
                type="button"
                class="slot"
                :class="{ 'slot--active': selected.includes(slot) }"
                :aria-pressed="selected.includes(slot)"
                @click="toggle(slot)"
            >
                {{ slot }}
            </button>
        </li>
    </ul>
</template>

<style scoped>
.slots {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(140px, 100%), 1fr));
    gap: 10px 13px;
}

.slots--lg {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px 14px;
}

.slot {
    width: 100%;
    min-height: 39px;
    padding: 10px 8px;
    border: 0;
    border-radius: var(--radius-sm);
    background: var(--color-slot);
    color: var(--color-text);
    font: 400 var(--text-md);
    white-space: nowrap;
    cursor: pointer;
    transition: background-color 0.15s, color 0.15s;
}

.slots--lg .slot {
    font: 400 16px / 19px var(--font-base);
}

.slot:hover {
    background: var(--color-slot-hover);
}

.slot:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
}

.slot--active {
    background: var(--color-accent);
    color: var(--color-white);
    font-weight: 700;
}

.slots--lg .slot--active {
    font-weight: 700;
}

.slot--active:hover {
    background: var(--color-accent-hover);
}

@media (max-width: 767px) {
    .slots {
        grid-template-columns: repeat(auto-fill, minmax(min(130px, 100%), 1fr));
        gap: 8px;
    }

    .slots--lg {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 400px) and (max-width: 767px) {
    .slots--lg {
        grid-template-columns: repeat(3, 1fr);
    }

    .slots--lg .slot {
        font: 400 var(--text-md);
    }
}
</style>
