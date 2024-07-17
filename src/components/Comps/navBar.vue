<script setup>
import useAuthStore from '@/stores/authen';

const auth = useAuthStore()
</script>

<template>
    <header class="w-full flex items-center bg-[#10132F] text-white p-1">
        <router-link :to="{name: 'home'}" class="mx-auto p-1 w-[180px] text-center">
            <h1 class="text-2xl uppercase tracking-wide font-bold font-mono text-white bg-red-500 p-1 rounded-lg ">
                Buratmedia</h1>
        </router-link>
        <nav class="mx-auto flex  font-mono font-semibold">
            <div class="space-x-10 items-center md:block hidden" v-show="auth?.user?.id === null">
                <router-link :to="{ name: 'signUp' }" active-class="text-red-500" class="p-1">
                    Sign up
                </router-link>
                <router-link :to="{ name: 'login' }" active-class="text-red-500" class="p-1"> Login
                </router-link>
            </div>
            <router-link :to="{ name: 'profile' }" class="flex justify-center flex-row-reverse items-center  hover:bg-slate-400 p-1 rounded-lg"
                v-show="auth?.user?.id !== null">
                Profile
                <img :src="auth.user?.photo ? auth.user?.photo : 'http://localhost:3000/src/assets/user.png'" alt=""
                    class="object-contain w-8 h-8 mx-3 rounded-full" />
            </router-link>

         



        </nav>
    </header>
</template>
