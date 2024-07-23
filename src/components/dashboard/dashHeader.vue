<script setup>
import useAuthStore from '@/stores/authen';
const auth = useAuthStore()

const emit = defineEmits(['open'])

const OpenS = ()=>{
    emit('open')
}
</script>

<template>

    <div class="w-[95%] bg-transparent flex py-2 justify-center items-center">
        <div class="flex border-2 w-full border-slate-800 p-3 justify-between items-center rounded-lg">
            <div class="flex ">
                <img :src="auth.user?.photo ? auth.user?.photo : 'http://localhost:3000/src/assets/user.png'" alt=""
                    class="object-contain w-12 h-12 mx-3 rounded-full border-2 border-slate-800" />
                <div class="flex flex-col justify-start">
                    <p class="text-lg font-semibold">{{ auth.user?.displayName ? auth.user?.displayName :
                        auth.user?.email }}</p>
                    <p class="text-[.8rem] text-slate-500">id:{{ auth.user?.id }}</p>
                    <!-- <button @click="auth?.logoutUser">LOGOUT</button> -->
                </div>
            </div>

            <button @click="OpenS"
                class="bg-blue-600 py-3 px-3 ms-10 rounded-lg w-[1/3] border-2 border-slate-800 hover:bg-blue-300 flex gap-3 text-white"><img
                    src="/src/assets/new-post.png" alt="" class="object-contain drop-shadow-lg w-6 h-6">Post</button>
        </div>


    </div>
</template>