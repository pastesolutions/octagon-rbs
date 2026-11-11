<script setup lang="ts">
const { title, days, selectedKey, todayKey, shiftMonth, select } = useCalendar();
const titleId = useId();

const dateFormat = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
const weeks = computed(() => Array.from({ length: 6 }, (_, i) => days.value.slice(i * 7, i * 7 + 7)));
</script>

<template>
    <section class="calendar" :aria-labelledby="titleId">
        <header class="calendar__head">
            <h2 :id="titleId" class="calendar__title" aria-live="polite">
                {{ title }}
                <AppIcon name="chevron-right" :size="18" class="calendar__title-icon" />
            </h2>
            <div class="calendar__arrows">
                <button type="button" class="calendar__arrow" aria-label="Предыдущий месяц" @click="shiftMonth(-1)">
                    <AppIcon name="chevron-left" :size="18" />
                </button>
                <button type="button" class="calendar__arrow" aria-label="Следующий месяц" @click="shiftMonth(1)">
                    <AppIcon name="chevron-right" :size="18" />
                </button>
            </div>
        </header>

        <table class="calendar__grid">
            <thead>
                <tr>
                    <th v-for="weekday in WEEKDAYS" :key="weekday" scope="col" class="calendar__weekday">{{ weekday }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(week, index) in weeks" :key="index">
                    <td v-for="day in week" :key="day.key">
                        <button
                            type="button"
                            class="calendar__day"
                            :class="{
                                'calendar__day--outside': !day.inMonth,
                                'calendar__day--weekend': day.weekend,
                                'calendar__day--today': day.key === todayKey,
                                'calendar__day--selected': day.key === selectedKey
                            }"
                            :aria-pressed="day.key === selectedKey"
                            :aria-label="dateFormat.format(day.date)"
                            @click="select(day)"
                        >
                            {{ day.day }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<style scoped>
.calendar {
    padding: 22px 30px 26px;
    border-radius: 9px;
    background: var(--color-surface);
}

.calendar__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 0 0 12px 10px;
}

.calendar__title {
    display: flex;
    align-items: center;
    gap: 50px;
    font: 700 20px / 24px var(--font-base);
    letter-spacing: 0.38px;
}

.calendar__title-icon {
    color: var(--color-text-muted);
}

.calendar__arrows {
    display: flex;
    gap: 12px;
}

.calendar__arrow {
    display: inline-flex;
    padding: 4px;
    border: 0;
    border-radius: var(--radius-sm);
    background: none;
    color: var(--color-text-muted);
    cursor: pointer;
    transition: background-color 0.15s, color 0.15s;
}

.calendar__arrow:hover {
    background: var(--color-slot);
    color: var(--color-text);
}

.calendar__grid {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.calendar__weekday {
    padding: 4px 0 16px;
    color: var(--color-calendar-head);
    font: 600 12px / 16px var(--font-base);
}

.calendar__grid td {
    padding: 0;
    text-align: center;
}

.calendar__day {
    display: inline-grid;
    place-items: center;
    width: 40px;
    height: 38px;
    border: 0;
    border-radius: 15px;
    background: none;
    color: var(--color-text);
    font: 400 16px / 21px var(--font-base);
    cursor: pointer;
    transition: background-color 0.15s, color 0.15s;
}

.calendar__day--weekend {
    color: var(--color-weekend);
}

.calendar__day--outside {
    color: var(--color-text-muted);
}

.calendar__day--outside.calendar__day--weekend {
    color: var(--color-weekend-muted);
}

.calendar__day--today {
    font-weight: 700;
}

.calendar__day:hover {
    background: var(--color-slot);
}

.calendar__day--selected,
.calendar__day--selected:hover {
    background: var(--color-primary);
    color: var(--color-white);
    font-weight: 600;
    letter-spacing: -0.32px;
}

.calendar__arrow:focus-visible,
.calendar__day:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
}

@media (max-width: 1439px) {
    .calendar {
        padding: 20px 16px;
    }

    .calendar__title {
        gap: 16px;
    }
}

@media (max-width: 400px) {
    .calendar__day {
        width: 36px;
        height: 34px;
        font-size: 14px;
    }
}
</style>
