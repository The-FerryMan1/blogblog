<script setup>
import { computed, ref } from 'vue';
import usePostStore from '@/stores/uploadPosts';
import useAuthStore from '@/stores/authen';

const auth = useAuthStore()
const P = usePostStore()
const data = defineProps({
    post: Object
})


const formattedData = computed(()=>{
    const time = data.post?.createdAt?.seconds * 1000
    const newDate = new Date(time)

    return newDate.toUTCString()
})



const likeValue = computed(()=>{
    const totalLikes = data.post?.likes?.length
    return totalLikes
})

const likeStatus = ref(null)
const likeHandler = (id) => {
    if (data.post?.likes?.includes(auth.user.email)){
        likeStatus.value = false
        P.likeUpdater(id, likeStatus.value)
    }else{
        likeStatus.value = true
        P.likeUpdater(id, likeStatus.value)
    }
    
}
</script>

<template>
    <div class="w-full h-full">
        <router-link :to="data?.post.id">
            <section class="flex justify-start items-center space-x-2">
                <img class="object-contain w-10 h-10 rounded-full"
                    :src="data.post?.userWhoPost?.photoURL ? data.post?.userWhoPost?.photoURL : 'http://localhost:3000/src/assets/user.png'"
                    alt="">
                <div>
                    <p class="text-base text-slate-800">{{ data.post?.userWhoPost?.displayName ? data.post?.userWhoPost.displayName :
    data.post?.userWhoPost?.email}}</p>
                    <h3 class="text-sm text-slate-600">{{ data.post?.userWhoPost?.email }}</h3>
                </div>
            </section>
            <section class="my-2 w-full">
                <p>{{ data.post?.content?.text }}</p>
            </section>
            <section>
                <img class="object-cover h-64 w-full rounded-lg" :src="data.post?.imageURL"
                    :alt="data.post?.content?.text">
            </section>
        </router-link>
        <section class="flex border-t-2 border-slate-800 mt-2 p-1 justify-between items-center">
            <div class="flex space-x-7 items-center">
                <button @click="likeHandler(data?.post.id)" type="button"
                    :class="data.post?.likes?.includes(auth.user.email) ? 'text-sm text-white py-2 px-5 bg-blue-600 relative border-2 mt-2 rounded-lg' : 'text-sm text-white py-2 px-5 bg-slate-600 relative border-2 mt-2 rounded-lg'">
                    <div
                        class="absolute top-0 -translate-y-2 translate-x-3 right-0 outline outline-white px-2 text-[12px] bg-red-800 rounded-full text-white">
                        {{ likeValue }}
                    </div>
                    <p>{{ likeValue > 1? "Likes":'Like'}}</p>
                </button>
                <button  type="button"
                    class='text-sm text-white py-2 px-5 bg-slate-600 relative border-2 mt-2 rounded-lg'>
                    <div
                        class="absolute top-0 -translate-y-2 translate-x-3 right-0 outline outline-white px-2 text-[12px] bg-red-800 rounded-full text-white">
                        {{ data.post?.shares }}
                    </div>
                    <p>{{ likeValue > 1? "Shares":'Share'}}</p>
                </button>
            </div>
            <div class="flex justify-center items-center">
                <p class="text-sm text-slate-700">{{ formattedData }}</p>
            </div>

        </section>
    </div>





</template>