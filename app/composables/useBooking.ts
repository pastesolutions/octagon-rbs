import type { BookingPreset, Invitation } from '~/types';
import { invitations as initialInvitations } from '~/utils/data';

const DEFAULT_ERROR = 'Неверный запрос. Обратитесь в техподдержку';

/** Общее состояние модальных окон бронирования, ошибки и списка приглашений. */
export function useBooking() {
    const preset = useState<BookingPreset | null>('booking-preset', () => null);
    const errorMessage = useState<string | null>('booking-error', () => null);
    const invitations = useState<Invitation[]>('invitations', () => [...initialInvitations]);

    function openBooking(value: BookingPreset) {
        preset.value = value;
    }

    function closeBooking() {
        preset.value = null;
    }

    function showError(message = DEFAULT_ERROR) {
        errorMessage.value = message;
    }

    function addInvitation(data: Omit<Invitation, 'id'>) {
        const id = Math.max(0, ...invitations.value.map((item) => item.id)) + 1;
        invitations.value = [{ id, ...data }, ...invitations.value];
    }

    function declineInvitation(id: number) {
        invitations.value = invitations.value.filter((item) => item.id !== id);
    }

    return { preset, errorMessage, invitations, openBooking, closeBooking, showError, addInvitation, declineInvitation };
}
