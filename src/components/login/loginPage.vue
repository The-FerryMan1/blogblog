<script setup>
import useAuthStore from '@/stores/authen';
import { ref } from 'vue';

const auth = useAuthStore()

const useCred = ref({
    email: null,
    password: null
})
const submitHandler = ()=>{
    auth.LoginUser(useCred.value)
}
</script>

<template>
    <div class="w-full h-full grid grid-cols-2 place-items-center font-mono">
        <div class="rounded-full drop-shadow-2xl">
            <img src="/src/assets/study.png" alt="">
        </div>
        <form @submit.prevent="submitHandler" action=""
            class="w-[90%] grid grid-cols-1  place-items-start py-3 px-4 rounded-lg space-y-5 shadow-lg">
            <h1 class="text-4xl place-self-start uppercase font-semibold my-8 ">Welcome back! Login to continue</h1>
            <div class="w-[100%] grid grid-cols-1 gap-3">
                <label for="" class="text-lg ">Email</label>
                <input
                    class="border-black outline-none focus:border-b-2 border-b-2 hover:bg-slate-200 rounded-lg py-2 px-1"
                    type="email" autocomplete="email" v-model="useCred.email">
            </div>
            <div class="w-[100%] grid grid-cols-1 gap-3">
                <label for="" class="text-lg ">Password</label>
                <input
                    class="border-black outline-none focus:border-b-2 border-b-2 hover:bg-slate-200 rounded-lg py-2 px-1"
                    type="password" autocomplete="new-password" v-model="useCred.password">
            </div>
            <div class="flex justify-evenly w-full items-center mt-5">
                <router-link :to="{ name: 'signUp'}" class="underline text-green-700 text-lg hover:text-green-500">Creat
                    account</router-link>
                <button
                    class="py-2 px-3 w-1/4 place-self-end text-white font-semibold font-mono text-lg rounded-lg  bg-blue-800 hover:bg-blue-500 disabled:text-slate-600 disabled:bg-slate-200"
                    :disabled="useCred.email == null || useCred.password == null">Login</button>
            </div>


        </form>
    </div>
</template>
