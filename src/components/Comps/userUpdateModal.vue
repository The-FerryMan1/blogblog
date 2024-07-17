<script setup>
import useAuthStore  from '@/stores/authen';
import { ref } from 'vue';
const auth = useAuthStore()


const photoUr = ref(null)
const changeDisplay = ref(null)
const imager = ref(null)
const photoHander = (e)=>{
    photoUr.value.click()
}

const imageHandler = (e)=>{
    const imahe = e.target.files[0]
    imager.value = imahe
    
}


const handleSubmit = ()=>{
    auth.updateUser(changeDisplay.value, imager.value)
}
</script>

<template>
    <form @submit.prevent="handleSubmit" action="" class="bg-white z-30 w-1/3 py-4 px-6 grid grid-cols-1 place-items-center rounded-lg gap-4">
        <div class="flex flex-row-reverse justify-end items-center gap-3 mt-3">
            <input @change="imageHandler" ref="photoUr" type="file" name="" id="" class="file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-50 file:text-blue-700
      hover:file:bg-blue-100">
            <img @click="photoHander"
                :src="auth.user?.photo ? auth.user?.photo : 'http://localhost:3000/src/assets/user.png'" alt=""
                class="w-[10%] h-[10%] hover:opacity-60 hover:outline rounded-full">
        </div>
        <div class="flex gap-3 justify-end items-center w-full mt-3">
            <label for="" class="text-nowrap">Display Name</label>
            <input v-model="changeDisplay" type=" text" :placeholder="auth.user.displayName ? auth.user.displayName: 'Set display name'"
                class="placeholder:text-slate-600 w-full py-2 px-3 rounded-lg bg-slate-200">
        </div>
        <button class="bg-blue-200 py-2 px-4 place-self-end rounded-lg hover:bg-blue-300">Save Changes</button>
    </form>
</template>