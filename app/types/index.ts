export interface Space {
    id: number;
    title: string;
    image: string;
    description: string;
    capacity: number;
    address: string;
}

export interface Resource {
    id: number;
    title: string;
    role: string;
    description: string;
    image?: string;
}

export interface Invitation {
    id: number;
    title: string;
    time: string;
    organizer: string;
    role: string;
    place: string;
}

export interface CurrentUser {
    name: string;
    email: string;
    avatar: string;
}

export type SortOption = 'default' | 'name-asc' | 'name-desc' | 'role';

export type BookingMode = 'new' | 'existing';

export interface BookingPreset {
    mode: BookingMode;
    place?: string;
    slots?: string[];
    people?: string[];
}
