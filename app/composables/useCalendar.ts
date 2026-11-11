export interface CalendarDay {
    key: string;
    date: Date;
    day: number;
    inMonth: boolean;
    weekend: boolean;
}

export const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const MONTHS = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

function toKey(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

/** Сетка месяца из 6 недель, неделя начинается с понедельника. */
export function useCalendar() {
    // Дата фиксируется на сервере и передаётся клиенту, чтобы не было расхождения при гидратации
    const todayIso = useState('calendar-today', () => new Date().toISOString());
    const view = ref(new Date(todayIso.value));
    const selected = ref(new Date(todayIso.value));

    onMounted(() => {
        const now = new Date();
        todayIso.value = now.toISOString();
        view.value = new Date(now.getFullYear(), now.getMonth(), 1);
        selected.value = now;
    });

    const title = computed(() => `${MONTHS[view.value.getMonth()]} ${view.value.getFullYear()}`);

    const days = computed<CalendarDay[]>(() => {
        const year = view.value.getFullYear();
        const month = view.value.getMonth();
        const offset = (new Date(year, month, 1).getDay() + 6) % 7;

        return Array.from({ length: 42 }, (_, i) => {
            const date = new Date(year, month, 1 - offset + i);
            return {
                key: toKey(date),
                date,
                day: date.getDate(),
                inMonth: date.getMonth() === month,
                weekend: i % 7 >= 5
            };
        });
    });

    const selectedKey = computed(() => toKey(selected.value));
    const todayKey = computed(() => toKey(new Date(todayIso.value)));

    function shiftMonth(step: number) {
        view.value = new Date(view.value.getFullYear(), view.value.getMonth() + step, 1);
    }

    function select(day: CalendarDay) {
        selected.value = day.date;
        if (!day.inMonth) view.value = new Date(day.date.getFullYear(), day.date.getMonth(), 1);
    }

    return { title, days, selectedKey, todayKey, shiftMonth, select };
}
