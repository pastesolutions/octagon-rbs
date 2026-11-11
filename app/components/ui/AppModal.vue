<script setup lang="ts">
withDefaults(defineProps<{ title: string; size?: 'md' | 'sm'; centered?: boolean }>(), { size: 'md' });
const open = defineModel<boolean>({ default: false });

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const dialog = ref<HTMLElement | null>(null);
const titleId = useId();
let lastFocused: HTMLElement | null = null;

function getFocusable() {
    return dialog.value ? [...dialog.value.querySelectorAll<HTMLElement>(FOCUSABLE)] : [];
}

watch(open, async (isOpen) => {
    if (isOpen) {
        lastFocused = document.activeElement as HTMLElement | null;
        document.body.style.overflow = 'hidden';
        await nextTick();
        const items = getFocusable();
        (items.find((el) => el.matches('input, select, textarea')) ?? items[0])?.focus();
    } else {
        document.body.style.overflow = '';
        lastFocused?.focus();
    }
});

onBeforeUnmount(() => {
    document.body.style.overflow = '';
});

function close() {
    open.value = false;
}

function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
        event.stopPropagation();
        close();
        return;
    }
    if (event.key !== 'Tab') return;

    const items = getFocusable();
    const first = items[0];
    const last = items[items.length - 1];

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
    }
}
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="open" class="modal" @mousedown.self="close" @keydown="onKeydown">
                <div
                    ref="dialog"
                    class="modal__dialog"
                    :class="[`modal__dialog--${size}`, { 'modal__dialog--centered': centered }]"
                    role="dialog"
                    aria-modal="true"
                    :aria-labelledby="titleId"
                >
                    <h2 :id="titleId" class="modal__title">{{ title }}</h2>
                    <slot />
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modal {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: grid;
    place-items: center;
    padding: 16px;
    overflow-y: auto;
    background: var(--color-overlay);
}

.modal__dialog {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: min(482px, 100%);
    padding: 32px;
    border-radius: var(--radius-md);
    background: var(--color-surface);
}

.modal__dialog--sm {
    width: min(372px, 100%);
    padding: 20px 30px;
}

.modal__dialog--centered {
    text-align: center;
}

.modal__title {
    font: 600 var(--text-2xl);
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.2s;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

@media (max-width: 479px) {
    .modal {
        padding: 8px;
    }

    .modal__dialog {
        padding: 24px 16px;
    }
}
</style>
