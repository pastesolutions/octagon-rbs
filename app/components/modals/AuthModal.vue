<script setup lang="ts">
const mode = defineModel<'login' | 'register' | null>({ default: null });

const open = computed({
    get: () => mode.value !== null,
    set: (value) => { if (!value) mode.value = null; }
});

const name = ref('');
const email = ref('');
const password = ref('');

watch(mode, () => {
    name.value = '';
    email.value = '';
    password.value = '';
});
</script>

<template>
    <AppModal v-model="open" :title="mode === 'register' ? 'Регистрация' : 'Вход'">
        <form class="auth" @submit.prevent="open = false">
            <AppField v-if="mode === 'register'" v-model="name" label="Имя и фамилия" placeholder="Иван Иванов" autocomplete="name" required />
            <AppField v-model="email" label="Электронная почта" type="email" placeholder="example@yandex.ru" autocomplete="email" required />
            <AppField
                v-model="password"
                label="Пароль"
                type="password"
                placeholder="Введите пароль"
                :autocomplete="mode === 'register' ? 'new-password' : 'current-password'"
                required
            />
            <div class="auth__actions">
                <AppButton type="submit" class="auth__submit">{{ mode === 'register' ? 'Зарегистрироваться' : 'Войти' }}</AppButton>
                <AppButton variant="secondary" @click="open = false">Отмена</AppButton>
            </div>
        </form>
    </AppModal>
</template>

<style scoped>
.auth {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.auth__actions {
    display: flex;
    gap: 10px;
}

.auth__submit {
    flex: 1;
}
</style>
