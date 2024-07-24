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
                <img class="object-contain w-10 h-10 rounded-full border-2 border-slate-800"
                    :src="data.post?.userWhoPost?.photoURL ? data.post?.userWhoPost?.photoURL : 'http://localhost:3000/src/assets/user.png'"
                    alt="">
                <div>
                    <p class="text-base text-slate-800">{{ data.post?.userWhoPost?.displayName ?
                        data.post?.userWhoPost.displayName :
                        data.post?.userWhoPost?.email}}</p>
                    <h3 class="text-sm text-slate-600">{{ data.post?.userWhoPost?.email }}</h3>
                </div>
            </section>
            <section class="my-2 w-full ">
                <p>{{ data.post?.content?.text }}</p>
            </section>
            <section class="border-2 border-slate-800 rounded-lg">
                <img class="object-cover h-64 w-full rounded-lg" :src="data.post?.imageURL"
                    :alt="data.post?.content?.text">
            </section>
        </router-link>
        <section class="flex border-t-2 border-slate-800 mt-2 p-1 justify-between items-center">
            <div class="flex space-x-7 items-center">
                <button @click="likeHandler(data?.post.id)" type="button"
                    :class="data.post?.likes?.includes(auth.user.email) ? 'text-sm text-white py-2 px-5 bg-blue-600 relative border-2 mt-2 rounded-lg  border-slate-800 hover:bg-blue-500' : 'text-sm text-white py-2 px-5 bg-slate-600 relative  mt-2 rounded-lg border-2 border-slate-800 hover:bg-slate-700'">
                    <div
                        class="absolute top-0 -translate-y-2 translate-x-3 right-0 outline outline-white px-2 text-[12px] bg-red-800 rounded-full text-white">
                        {{ likeValue }}
                    </div>
                    <svg class="w-6 h-6" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"
                        stroke="#ffffff">

                        <g id="SVGRepo_bgCarrier" stroke-width="0" />

                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC"
                            stroke-width="2.8999999999999995" />

                        <g id="SVGRepo_iconCarrier">
                            <path d="M8.9707 19.42V13.89" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path
                                d="M2.28234 12.67C2.25751 12.2167 2.32536 11.7631 2.48175 11.3369C2.63813 10.9106 2.87975 10.5208 3.19187 10.1911C3.504 9.86141 3.88006 9.59877 4.29708 9.41931C4.71411 9.23985 5.16335 9.14734 5.61735 9.14734C6.07135 9.14734 6.52058 9.23985 6.9376 9.41931C7.35463 9.59877 7.73069 9.86141 8.04281 10.1911C8.35493 10.5208 8.59657 10.9106 8.75296 11.3369C8.90934 11.7631 8.97717 12.2167 8.95234 12.67V18.3C8.97717 18.7533 8.90934 19.207 8.75296 19.6332C8.59657 20.0594 8.35493 20.4492 8.04281 20.7789C7.73069 21.1086 7.35463 21.3712 6.9376 21.5507C6.52058 21.7301 6.07135 21.8227 5.61735 21.8227C5.16335 21.8227 4.71411 21.7301 4.29708 21.5507C3.88006 21.3712 3.504 21.1086 3.19187 20.7789C2.87975 20.4492 2.63813 20.0594 2.48175 19.6332C2.32536 19.207 2.25751 18.7533 2.28234 18.3V12.67Z"
                                stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                d="M8.97076 18.3C8.96813 18.7399 9.05217 19.176 9.21809 19.5835C9.38402 19.9909 9.62857 20.3617 9.93779 20.6747C10.247 20.9876 10.6148 21.2366 11.0203 21.4073C11.4257 21.5781 11.8608 21.6674 12.3008 21.67H16.4208C17.3814 21.6693 18.316 21.357 19.0841 20.78C19.8522 20.203 20.4125 19.3924 20.6808 18.47L22.1808 13.39C22.3002 13.0523 22.3372 12.691 22.2889 12.3361C22.2405 11.9812 22.1081 11.643 21.9028 11.3496C21.6974 11.0562 21.4249 10.816 21.108 10.6491C20.7911 10.4822 20.4389 10.3934 20.0808 10.39H14.5608V5.10999C14.5621 4.91825 14.5256 4.72818 14.4535 4.55054C14.3813 4.3729 14.2749 4.21121 14.1402 4.07471C14.0056 3.9382 13.8454 3.82953 13.6687 3.75494C13.4921 3.68036 13.3025 3.64132 13.1108 3.64001V3.64001C12.7953 3.64144 12.4889 3.74572 12.2381 3.93701C11.9872 4.1283 11.8056 4.39617 11.7208 4.70001L8.97076 13.86"
                                stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </g>

                    </svg>
                </button>
                <button type="button"
                    class='text-sm text-white py-2 px-5 bg-slate-600 relative border-2 mt-2 rounded-lg'>
                    <div
                        class="absolute top-0 -translate-y-2 translate-x-3 right-0 outline outline-white px-2 text-[12px] bg-red-800 rounded-full text-white border-2 border-slate-800">
                        {{ data.post?.shares }}
                    </div>
                    <svg class="w-6 h-6" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"
                        stroke="#ffffff">

                        <g id="SVGRepo_bgCarrier" stroke-width="0" />

                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M13.47 4.13998C12.74 4.35998 12.28 5.96 12.09 7.91C6.77997 7.91 2 13.4802 2 20.0802C4.19 14.0802 8.99995 12.45 12.14 12.45C12.34 14.21 12.79 15.6202 13.47 15.8202C15.57 16.4302 22 12.4401 22 9.98006C22 7.52006 15.57 3.52998 13.47 4.13998Z"
                                stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </g>

                    </svg>
                </button>
            </div>
            <div class="flex justify-center items-center border-2 border-slate-800 rounded-lg">
                <p class="text-sm text-slate-700 py-2 px-5">{{ formattedData }}</p>
            </div>

        </section>
    </div>





</template>