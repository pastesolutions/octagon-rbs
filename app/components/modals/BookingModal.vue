<script setup lang="ts">
import { TIME_SLOTS, currentUser, events, people } from '~/utils/data';

const { preset, closeBooking, showError, addInvitation } = useBooking();

const open = computed({
    get: () => preset.value !== null,
    set: (value) => { if (!value) closeBooking(); }
});

const title = ref('');
const slots = ref<string[]>([]);
const responsible = ref<string[]>([]);
const comment = ref('');
const picking = ref(false);
const pickerId = useId();

const isNew = computed(() => preset.value?.mode !== 'existing');
const peopleNames = [...new Set(people.map((person) => person.title))];
const available = computed(() => peopleNames.filter((name) => !responsible.value.includes(name)));

watch(preset, (value) => {
    if (!value) return;
    title.value = '';
    slots.value = [...(value.slots ?? [])];
    responsible.value = [...(value.people ?? [])];
    comment.value = '';
    picking.value = false;
});

function addPerson(event: Event) {
    const name = (event.target as HTMLSelectElement).value;
    if (name) responsible.value = [...responsible.value, name];
    picking.value = false;
}

function removePerson(name: string) {
    responsible.value = responsible.value.filter((item) => item !== name);
}

function timeRange(selected: string[]) {
    const sorted = [...selected].sort((a, b) => TIME_SLOTS.indexOf(a) - TIME_SLOTS.indexOf(b));
    const start = sorted[0]?.split(' - ')[0];
    const end = sorted[sorted.length - 1]?.split(' - ')[1];
    return `${start} - ${end}`;
}

function shortName(fullName: string) {
    const [first = '', last = ''] = fullName.split(' ');
    return `${last} ${first.charAt(0)}.`;
}

function submit() {
    if (!title.value.trim()) {
        showError(isNew.value ? 'Введите название мероприятия' : 'Выберите мероприятие');
        return;
    }
    if (!slots.value.length) {
        showError('Выберите хотя бы одно время мероприятия');
        return;
    }

    const role = people.find((person) => person.title === responsible.value[0])?.role ?? 'Участник';
    addInvitation({
        title: title.value.trim(),
        time: timeRange(slots.value),
        organizer: shortName(currentUser.name),
        role,
        place: preset.value?.place ?? 'Не указано'
    });
    closeBooking();
}
</script>

<template>
    <AppModal v-model="open" :title="isNew ? 'Новое мероприятие' : 'Бронирование'">
        <form class="booking" novalidate @submit.prevent="submit">
            <AppField
                v-if="isNew"
                v-model="title"
                label="Название"
                placeholder="Введите название мероприятия"
                autocomplete="off"
            />
            <AppField
                v-else
                v-model="title"
                label="Мероприятие"
                placeholder="Выберите мероприятие"
                :options="events"
            />

            <fieldset class="booking__group">
                <legend class="booking__label">Выберите время мероприятия</legend>
                <TimeSlotPicker v-model="slots" label="Время мероприятия" size="lg" />
            </fieldset>

            <fieldset class="booking__group booking__group--line">
                <legend class="booking__label">Ответственные лица</legend>
                <div class="booking__people">
                    <button
                        v-for="name in responsible"
                        :key="name"
                        type="button"
                        class="booking__person"
                        :aria-label="`Убрать: ${name}`"
                        @click="removePerson(name)"
                    >
                        {{ name }}
                    </button>
                    <label v-if="picking" :for="pickerId" class="visually-hidden">Добавить ответственное лицо</label>
                    <select v-if="picking" :id="pickerId" class="booking__picker" @change="addPerson" @keydown.esc.stop="picking = false">
                        <option value="">Выберите человека</option>
                        <option v-for="name in available" :key="name" :value="name">{{ name }}</option>
                    </select>
                    <button
                        v-else-if="available.length"
                        type="button"
                        class="booking__add"
                        aria-label="Добавить ответственное лицо"
                        @click="picking = true"
                    >
                        <AppIcon name="plus" />
                    </button>
                </div>
            </fieldset>

            <AppField v-model="comment" label="Дополнительная информация" placeholder="Добавить комментарий" autocomplete="off" />

            <div class="booking__actions">
                <AppButton type="submit" class="booking__submit">Забронировать</AppButton>
                <AppButton variant="secondary" class="booking__cancel" @click="closeBooking">Отмена</AppButton>
            </div>
        </form>
    </AppModal>
</template>

<style scoped>
.booking {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.booking__group {
    min-width: 0;
    margin: 0;
    padding: 0;
    border: 0;
}

.booking__group--line {
    padding-bottom: 8px;
    border-bottom: 1px solid var(--color-text-muted);
}

.booking__label {
    margin-bottom: 16px;
    padding: 0;
    font: 400 var(--text-sm);
}

.booking__group--line .booking__label {
    margin-bottom: 8px;
}

.booking__people {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
}

.booking__person {
    padding: 5px 16px;
    border: 0;
    border-radius: var(--radius-xs);
    background: var(--color-accent);
    color: var(--color-white);
    font: 700 var(--text-sm);
    cursor: pointer;
    transition: background-color 0.15s;
}

.booking__person:hover {
    background: var(--color-primary);
    text-decoration: line-through;
}

.booking__add {
    display: inline-flex;
    padding: 4px;
    border: 0;
    border-radius: var(--radius-sm);
    background: none;
    cursor: pointer;
}

.booking__add:hover {
    background: var(--color-slot);
}

.booking__picker {
    padding: 4px 8px;
    border: 1px solid var(--color-accent);
    border-radius: var(--radius-xs);
    background: var(--color-white);
}

.booking__person:focus-visible,
.booking__add:focus-visible,
.booking__picker:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
}

.booking__actions {
    display: flex;
    gap: 10px;
    margin-top: 4px;
}

.booking__submit {
    flex: 1;
}

.booking__cancel {
    padding-inline: 25px;
}
</style>
