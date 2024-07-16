<script setup>
import useAuthStore from '@/stores/authen';
import usePostStore from '@/stores/uploadPosts';
import { onMounted } from 'vue';


const poster = usePostStore()
const auth = useAuthStore()

onMounted(()=>{
  poster.usersPost()
})
</script>

<template>
  <div class="w-1/2 h-full overflow-hidden flex flex-col justify-start items-center border-2 border-slate-800">
    <section class="w-full">
      <div class="w-full p-3 flex items-center gap-3">
        <img :src="auth.user?.photo ? auth.user?.photo : 'http://localhost:3000/src/assets/user.png'" alt=""
          class="w-[25%] h-[25%] hover:opacity-60 hover:outline rounded-full">
        <div class="flex flex-col space-y-[.5]">
          <p class="text-lg font-semibold flex w-full relative items-center">{{ auth.user?.email }} <button
              class="absolute top-0 flex items-center right-0 text-sm translate-x-[110px] bg-[#ff6700] gap-2 rounded-lg px-1 py-1 ms-2 text-white hover:opacity-60"
              v-show="!auth.user?.emailVer"><img class="w-4 h-4" src="/src/assets/icons8-warning-30.png" alt="">Not
              verified</button></p>
          <p class="text-[.9rem] text-slate-500  font-semibold">{{ auth.user?.displayName ?
            auth.user?.displayName:"no display name" }}</p>
          <p class="text-[.8rem] text-slate-500">id:{{ auth.user?.id }}</p>
        </div>
        <div class="w-full flex self-start justify-end px-2 py-1 text-white">
          <button class="flex gap-2 px-2 py-2 hover:opacity-60 items-center rounded-lg bg-blue-500"><img class="h-5 w-5"
              src="/src/assets/icons8-edit.svg" alt=""> Edit</button>
        </div>
      </div>
    </section>
    <section
      class="w-full h-full grid grid-cols-1 place-items-center bg-slate-100 rounded-[100px_100px_0px_0px] border-t-2 border-black overflow-y-auto no-scrollbar">
      <KeepAlive>
        <div v-for="poster in poster.mgaPostUsers" :key="poster.id">
          {{ poster }}
        </div>
      </KeepAlive>

    </section>
    <button @click="auth.logoutUser()">logout</button>
  </div>
</template>