<script setup>
import { ref, defineAsyncComponent } from 'vue';
import DashModal from '@/components/Comps/dashModal.vue'
import DashHeader from '@/components/dashboard/dashHeader.vue'
import usePostStore from '@/stores/uploadPosts';
const postCont = defineAsyncComponent(()=>import('@/components/dashboard/postCont.vue'))




const openOrNot = ref(false)
const posts = usePostStore()
const modalHandler = ()=>{
    openOrNot.value = !openOrNot.value
}
</script>

<template>
    <div class="w-1/2 h-full overflow-hidden flex flex-col justify-center items-center border-2 border-slate-800">
        <DashHeader @open="modalHandler" v-once />

        <div v-if="!posts.mgaPost && posts.loadingStat" class="w-[100%] h-full grid grid-cols-1 place-items-center">
            loading
        </div>
        <div v-else-if="posts.mgaPost && !posts.loadingStat"
            class="w-[100%] h-full flex flex-col items-center overflow-y-auto space-y-5 no-scrollbar my-4">
            <KeepAlive>
                <postCont :post="posts.mgaPost" />
            </KeepAlive>
        </div>
        <div v-else class="w-[100%] h-full grid grid-cols-1 place-items-center">
            no content
        </div>



    </div>
    <Teleport to="#app">
        <div v-show="openOrNot" class="w-full h-full fixed grid grid-cols-1 place-items-center">
         
            <DashModal @open="modalHandler" />
            <div @click="modalHandler" class="w-full h-screen fixed bg-black opacity-80 z-0"></div>
        </div>
    </Teleport>

</template>