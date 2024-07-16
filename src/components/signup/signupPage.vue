<script setup>
import useAuthStore from '@/stores/authen';
import { ref } from 'vue';

const auth = useAuthStore()

const userCred = ref({
    email: null,
    password: null
})
const confirmPass = ref(null)

const submitHandler = () => {
    if (userCred.value.password.includes(" ") || confirmPass.value.includes(" ")) {
        alert("password must not have spaces")
    } else if (userCred.value.password === confirmPass.value){
        auth.signUpUser(userCred.value)
    }
    
}
</script>

<template>
    <div class="w-full h-full grid grid-cols-2 place-items-center font-mono">
        <div class="rounded-full drop-shadow-2xl">
            <img src="/src/assets/monitoring.png" alt="">
        </div>
        <form @submit.prevent="submitHandler" action=""
            class="w-[90%] grid grid-cols-1  place-items-start py-3 px-4 rounded-lg space-y-5 shadow-lg">
            <h1 class="text-4xl place-self-start uppercase font-semibold my-8 ">Welcome!
                Sign up to get started</h1>
            <div class="w-[100%] grid grid-cols-1 gap-3">
                <label for="" class="text-lg ">Email</label>
                <input
                    class="border-black outline-none focus:border-b-2 border-b-2 hover:bg-slate-200 rounded-lg py-2 px-1"
                    type="email" autocomplete="email" v-model="userCred.email">
            </div>
            <div class="w-[100%] grid grid-cols-1 gap-3">
                <label for="" class="text-lg ">Password</label>
                <input
                    class="border-black outline-none focus:border-b-2 border-b-2 hover:bg-slate-200 rounded-lg py-2 px-1"
                    type="password" autocomplete="new-password" v-model="userCred.password">
            </div>
            <div class="w-[100%] grid grid-cols-1 gap-3">
                <label for="" class="text-lg ">Confirm Password</label>
                <input
                    class="border-black outline-none focus:border-b-2 border-b-2 hover:bg-slate-200 rounded-lg py-2 px-1"
                    type="password" autocomplete="new-password" v-model="confirmPass">
            </div>
            <div class="flex justify-evenly w-full items-center mt-5">
                <router-link :to="{ name: 'login'}" class="text-blue-700 underline text-lg hover:text-blue-500">Already
                    have an account?</router-link>
                <button :disabled="userCred.email == null || userCred.password == null || confirmPass == null"
                    class="py-2 px-3 w-1/4 place-self-end text-white font-semibold font-mono text-lg rounded-lg  bg-blue-800 hover:bg-blue-500 disabled:bg-slate-300 disabled:text-slate-700">Submit</button>

            </div>

        </form>
    </div>
</template>
