import type { Resource, SortOption } from '~/types';

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: 'default', label: 'По умолчанию' },
    { value: 'name-asc', label: 'По алфавиту' },
    { value: 'name-desc', label: 'С конца алфавита' },
    { value: 'role', label: 'По категории' }
];

/** Поиск и сортировка карточек ресурсов (люди, аппаратура). */
export function useResourceList(items: Resource[]) {
    const search = ref('');
    const sort = ref<SortOption>('default');

    const visible = computed(() => {
        const query = search.value.trim().toLowerCase();
        const filtered = query
            ? items.filter((item) => `${item.title} ${item.role} ${item.description}`.toLowerCase().includes(query))
            : [...items];

        // «По умолчанию» — порядок из данных, как в макете
        if (sort.value === 'default') return filtered;

        const byName = (a: Resource, b: Resource) => a.title.localeCompare(b.title, 'ru');

        return filtered.sort((a, b) => {
            if (sort.value === 'role') return a.role.localeCompare(b.role, 'ru') || byName(a, b);
            return sort.value === 'name-asc' ? byName(a, b) : -byName(a, b);
        });
    });

    return { search, sort, visible };
}
