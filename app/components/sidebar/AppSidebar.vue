<script setup lang="ts">
const { invitations, declineInvitation } = useBooking();
</script>

<template>
    <aside class="sidebar" aria-label="Календарь и приглашения">
        <BookingCalendar />

        <section class="sidebar__section" aria-labelledby="invitations-title">
            <h2 id="invitations-title" class="section-title">Активные приглашения</h2>
            <TransitionGroup v-if="invitations.length" name="list" tag="ul" class="sidebar__list">
                <li v-for="invitation in invitations" :key="invitation.id">
                    <InvitationCard :invitation="invitation" @decline="declineInvitation" />
                </li>
            </TransitionGroup>
            <p v-else class="sidebar__empty">Активных приглашений нет</p>
        </section>
    </aside>
</template>

<style scoped>
.sidebar {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.sidebar__section,
.sidebar__list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.sidebar__empty {
    padding: 30px;
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text-muted);
}

.list-enter-active,
.list-leave-active {
    transition: opacity 0.2s, transform 0.2s;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(16px);
}
</style>
