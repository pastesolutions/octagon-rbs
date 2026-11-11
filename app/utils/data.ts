import type { CurrentUser, Invitation, Resource, Space } from '~/types';
import avatar from '~/assets/images/avatar.jpg';
import personIvan from '~/assets/images/person-ivan.jpg';
import personAnastasia from '~/assets/images/person-anastasia.jpg';
import spaceCoworking from '~/assets/images/space-coworking.jpg';
import spaceMeeting from '~/assets/images/space-meeting.jpg';

export const TIME_SLOTS: string[] = Array.from({ length: 12 }, (_, i) => {
    const pad = (hour: number) => `${String(hour).padStart(2, '0')}.00`;
    return `${pad(8 + i)} - ${pad(9 + i)}`;
});

export const currentUser: CurrentUser = {
    name: 'Иван Иванов',
    email: 'example@yandex.ru',
    avatar
};

export const spaces: Space[] = [
    {
        id: 1,
        title: 'Коворкинг ИРНИТУ',
        image: spaceCoworking,
        description: 'Открытое пространство для командной работы: 40 рабочих мест, проектор, флипчарты и зона отдыха.',
        capacity: 40,
        address: 'ул. Лермонтова, 83, корпус В'
    },
    {
        id: 2,
        title: 'Переговорная ИРНИТУ',
        image: spaceMeeting,
        description: 'Переговорная комната с большим столом, экраном для презентаций и системой видеосвязи.',
        capacity: 12,
        address: 'ул. Лермонтова, 83, корпус А'
    }
];

const SERVICE_TEXT = 'Высококачественная видеосъёмка и аэросъёмка: доступные цены, профессиональное оборудование и опытные специалисты';

// Как в макете: четыре ряда «Иван Иванов — Анастасия Ремогузина»
export const people: Resource[] = Array.from({ length: 8 }, (_, i) => (
    i % 2 === 0
        ? { id: i + 1, title: 'Иван Иванов', role: 'Фотограф', description: SERVICE_TEXT, image: personIvan }
        : { id: i + 1, title: 'Анастасия Ремогузина', role: 'Фотограф', description: SERVICE_TEXT, image: personAnastasia }
));

export const equipment: Resource[] = [
    { id: 1, title: 'Sony A7 IV', role: 'Камера', description: 'Полнокадровая беззеркальная камера, 33 Мп, запись видео 4K 60p. В комплекте объектив 24–70 мм.' },
    { id: 2, title: 'DJI Mini 4 Pro', role: 'Квадрокоптер', description: 'Компактный дрон для аэросъёмки 4K HDR, до 34 минут полёта, всенаправленное обнаружение препятствий.' },
    { id: 3, title: 'Epson EB-FH52', role: 'Проектор', description: 'Full HD проектор яркостью 4000 лм, подключение по HDMI и Wi-Fi.' },
    { id: 4, title: 'Rode Wireless GO II', role: 'Микрофон', description: 'Беспроводная двухканальная петличная система для интервью и выступлений.' },
    { id: 5, title: 'Godox SL60W', role: 'Свет', description: 'Комплект из двух LED-осветителей со стойками и софтбоксами.' },
    { id: 6, title: 'MacBook Pro 14"', role: 'Ноутбук', description: 'Ноутбук для монтажа и презентаций, установлены Final Cut Pro и Keynote.' }
];

export const events: string[] = [
    'Съёмки в первомайском',
    'Конференция ИРНИТУ',
    'Встреча проектной команды',
    'Мастер-класс по фотографии'
];

export const invitations: Invitation[] = [
    { id: 1, title: 'Съёмки в первомайском', time: '10.00 - 12.00', organizer: 'Иванов И.', role: 'Фотограф', place: 'Коворкинг ИРНИТУ' },
    { id: 2, title: 'Съёмки в первомайском', time: '10.00 - 12.00', organizer: 'Иванов И.', role: 'Фотограф', place: 'Переговорная ИРНИТУ' }
];
