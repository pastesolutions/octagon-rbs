<script setup lang="ts">
withDefaults(defineProps<{
    label: string;
    placeholder?: string;
    type?: string;
    options?: string[];
    autocomplete?: string;
    required?: boolean;
}>(), {
    type: 'text'
});
const model = defineModel<string>({ default: '' });
const id = useId();
</script>

<template>
    <div class="field">
        <label :for="id" class="field__label">{{ label }}</label>
        <div class="field__control">
            <select v-if="options" :id="id" v-model="model" class="field__input field__select" :class="{ 'field__input--empty': !model }" :required="required">
                <option value="" disabled>{{ placeholder }}</option>
                <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
            </select>
            <input
                v-else
                :id="id"
                v-model="model"
                class="field__input"
                :type="type"
                :placeholder="placeholder"
                :autocomplete="autocomplete"
                :required="required"
            >
            <AppIcon v-if="options" name="chevron-down" class="field__chevron" />
        </div>
    </div>
</template>

<style scoped>
.field {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.field__label {
    font: 400 var(--text-sm);
}

.field__control {
    position: relative;
}

.field__input {
    width: 100%;
    padding: 0 0 8px;
    border: 0;
    border-bottom: 1px solid var(--color-text-muted);
    border-radius: 0;
    background: transparent;
    font: 400 var(--text-md);
    transition: border-color 0.15s;
}

.field__input::placeholder,
.field__input--empty {
    color: var(--color-text-muted);
}

.field__input:hover {
    border-bottom-color: var(--color-text);
}

.field__input:focus-visible {
    outline: none;
    border-bottom-color: var(--color-primary);
    box-shadow: 0 1px 0 var(--color-primary);
}

.field__select {
    padding-right: 24px;
    appearance: none;
    cursor: pointer;
}

.field__select option {
    color: var(--color-text);
}

.field__chevron {
    position: absolute;
    top: 2px;
    right: 0;
    pointer-events: none;
}
</style>
