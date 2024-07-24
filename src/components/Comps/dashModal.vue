<script setup>
import { ref } from 'vue';
import usePostStore from '@/stores/uploadPosts';
import useAuthStore from '@/stores/authen';
import postLoader from './postLoader.vue';

const emit = defineEmits(['open'])

const OpenS = () => {
    emit('open')
}
const auth = useAuthStore()
const post = usePostStore()
const inputFile = ref(null)
const textIto = ref('')
const images = ref(null)
const loader = ref(false)




const imageFile = () => {
    inputFile.value = ' '
}

const imagePicker = (e) => {
    console.log(e.target.files[0])
    images.value = e.target.files[0]
}



const submitHandler = async () => {
    const postData = {
        text: textIto.value,
        files: images.value?.name
    }

    try {
        loader.value = true
        await post.postHandler(postData, images.value)
        inputFile.value = ''
        textIto.value = ''
        images.value = null       
        loader.value = false
        OpenS()
    } catch (error) {
        
    }
  
    

   
    
}


</script>

<template>
    <form @submit.prevent="submitHandler" action=""
        class="bg-white p-2 z-30 rounded-lg h-[40%] w-[40%] flex flex-col relative">

        <button :disabled="loader" @click="OpenS" type="button" class="absolute top-0 right-0 translate-x-7 -translate-y-8">
            <svg class="w-12 h-12 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                stroke="transparent">
                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                <g id="SVGRepo_iconCarrier">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z"
                        fill="#ff0019" />
                </g>
            </svg>
        </button>
        <div class="absolute top-0 left-0 -translate-x-10 -translate-y-8">
            <img :src="auth.user?.photo ? auth.user?.photo : 'http://localhost:3000/src/assets/user.png'" alt=""
                class="w-[8.5%] h-[8.5%] rounded-full outline-white outline">
        </div>
        <textarea class="resize-none outline-none p-2 h-[100%] w-[100%]" v-model="textIto"
            placeholder="What is on your mind?"></textarea>
        <!-- <input @change="imagePicker" ref="inputFile" name="files" id="inputFile" type="file" class="hidden"> -->
        <section class="flex  justify-between p-2 items-start border-t-2  border-slate-400 text-base">

            <input @change="imagePicker" ref="inputFile" name="files" id="inputFile" type="file" class="file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-50 file:text-blue-700
      hover:file:bg-blue-100">


            <button class="px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-300 ">Create</button>
        </section>
        <div v-show="loader"
            class="absolute  bg-slate-500 opacity-60 z-30 h-[100%] w-[100%] rounded-lg top-[0%] left-[0%] flex flex-col justify-center items-center">
            <postLoader />
        </div>
    </form>
</template>