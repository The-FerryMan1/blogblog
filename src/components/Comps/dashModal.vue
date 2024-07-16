<script setup>
import { ref } from 'vue';
import usePostStore from '@/stores/uploadPosts';

const post = usePostStore()

const inputFile = ref(null)
const textIto = ref('')
const images = ref(null)
const imageFile = ()=>{
    inputFile.value.click()
}

const imagePicker = (e)=>{
    console.log(e.target.files[0])
    images.value = e.target.files[0]
}



const submitHandler = ()=>{
    const postData = {
        text: textIto.value,
        files: images.value.name
    }
    post.postHandler(postData, images.value)
   

}



</script>

<template>
    <form @submit.prevent="submitHandler" action="" class="bg-red-500 p-10 z-30">
        <button type="button" @click="imageFile">select file</button>
        <textarea v-model="textIto"  placeholder="What is on your mind?">
        </textarea>
        <input @change="imagePicker" ref="inputFile" name="files" id="inputFile" type="file" class="hidden">
        <button>submit</button>

        <p v-show="images">{{ images?.name }}</p>
    </form>
</template>