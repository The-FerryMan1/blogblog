<script setup>
import {onMounted, ref, computed, watch} from 'vue';
import { useRoute } from 'vue-router';
import usePostStore from '@/stores/uploadPosts';
import useAuthStore from '@/stores/authen';
import updatePostModal from '../Comps/updatePostModal.vue';
const auth = useAuthStore()
const post = usePostStore()
const route = useRoute()

const tsop = ref(null)
const openOrNot = ref(false)
const modalHandler = () => {
    openOrNot.value = !openOrNot.value
}
onMounted(()=>{
    getPost()
    
})

post?.$subscribe(()=>{
    getPost()
}, {detached: true})
// watch(post?.mgaPost, ()=>{
//     console.log("change")
// },{deep: true})

const getPost = ()=>{
    post.getOnePost(route.params.id).then((item) => {
        tsop.value = item
    })
}

const formattedData = computed(() => {
    const time = tsop.value?.createdAt?.seconds * 1000
    const newDate = new Date(time)

    return newDate.toUTCString()
})


const likeValue = computed(() => {
    const totalLikes = tsop.value?.likes?.length
    return totalLikes
})

const likeStatus = ref(null)

const likeHandler = (id) => {
    if (tsop.value?.likes?.includes(auth.user.email)) {
        likeStatus.value = false
        post.likeUpdater(id, likeStatus.value)
        // getPost()
    } else {
        likeStatus.value = true
        post.likeUpdater(id, likeStatus.value)
        // getPost()
    }
}

const comment = ref(null)
const handleCommentSubmit = ()=>{
    post.Addcomment(comment.value, route.params.id).then(()=>{
        
    })
}
</script>

<template>
    <KeepAlive>
        <div class="w-1/2 h-full p-2 overflow-y-auto no-scrollbar flex flex-col justify-start items-start bg-[#c9c9c9]">
            <router-link to="/" class="rounded-full py-2 bg-blue-500 w-10 h-10">
                <svg class="h-full w-full" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"
                    stroke="#ffffff">

                    <g id="SVGRepo_bgCarrier" stroke-width="0" />

                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                    <g id="SVGRepo_iconCarrier">

                        <path fill="#ffffff" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" />

                        <path fill="#ffffff"
                            d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" />

                    </g>

                </svg>
            </router-link>
            <div class="flex flex-col w-full justify-start items-center gap-3">
                <section class="w-full flex mt-2 justify-start items-center bg-white rounded-lg py-3">
                    <img :src="tsop?.userWhoPost?.photoURL" alt=""
                        class="object-contain w-16 h-16 mx-3 rounded-full border-slate-800">
                    <div>
                        <h3 class="text-lg text-black font-semibold">{{ tsop?.userWhoPost?.displayName }}</h3>
                        <p class="text-md text-slate-600">{{ tsop?.userWhoPost?.email }}</p>
                    </div>
                    <div v-show="auth?.user?.email == tsop?.userWhoPost?.email" class="ms-auto me-4 flex gap-2 p-2">
                        <button @click="modalHandler"
                            class="flex gap-2 px-4 py-2 text-white hover:opacity-60 items-center rounded-lg bg-blue-500  "><img
                                class="h-5 w-5" src="/src/assets/icons8-edit.svg" alt=""></button>
                        <button @click="post?.deletePost(route.params.id)"
                            class="flex gap-2 px-4 py-2 text-white hover:opacity-60 items-center rounded-lg bg-red-500  "><img
                                class="h-5 w-5" src="/src/assets/delete-svgrepo-com.svg" alt=""></button>
                    </div>

                </section>


                <section class="w-full p-2 bg-white rounded-lg">
                    <p class="w-full text-wrap  p-2">{{ tsop?.content?.text }}</p>
                    <a :href="tsop?.imageURL" class="relative w-full drop-shadow-lg">
                        <img :src="tsop?.imageURL" alt=""
                            class="w-full h-[300px] object-cover rounded-lg brightness-75 hover:brightness-100">
                        <p
                            class="absolute text-sm shadow-lg text-black bottom-0 p-2 right-0 bg-white border-l-2 border-t-2 rounded-l-lg">
                            {{ formattedData }}</p>
                    </a>
                    <section class="w-full p-2 mt-2">
                        <div class="flex space-x-7 items-center">
                            <button @click="likeHandler(route.params.id)" type="button"
                                :class="tsop?.likes?.includes(auth.user.email) ? 'group text-sm text-white py-2 px-5 bg-blue-600 relative  mt-2 rounded-lg   hover:bg-blue-500 drop-shadow-lg' : 'drop-shadow-lg text-sm text-white py-2 px-5 group bg-slate-600 relative  mt-2 rounded-lg   hover:bg-slate-700'">
                                <div
                                    class="absolute top-0 -translate-y-2 translate-x-3 right-0 outline outline-white px-2 text-[12px] bg-red-800 rounded-full text-white">
                                    {{ likeValue }}
                                </div>
                                <svg class="w-6 h-6" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    stroke="#ffffff">

                                    <g id="SVGRepo_bgCarrier" stroke-width="0" />

                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"
                                        stroke="#CCCCCC" stroke-width="2.8999999999999995" />

                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M8.9707 19.42V13.89" stroke="#ffffff" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path
                                            d="M2.28234 12.67C2.25751 12.2167 2.32536 11.7631 2.48175 11.3369C2.63813 10.9106 2.87975 10.5208 3.19187 10.1911C3.504 9.86141 3.88006 9.59877 4.29708 9.41931C4.71411 9.23985 5.16335 9.14734 5.61735 9.14734C6.07135 9.14734 6.52058 9.23985 6.9376 9.41931C7.35463 9.59877 7.73069 9.86141 8.04281 10.1911C8.35493 10.5208 8.59657 10.9106 8.75296 11.3369C8.90934 11.7631 8.97717 12.2167 8.95234 12.67V18.3C8.97717 18.7533 8.90934 19.207 8.75296 19.6332C8.59657 20.0594 8.35493 20.4492 8.04281 20.7789C7.73069 21.1086 7.35463 21.3712 6.9376 21.5507C6.52058 21.7301 6.07135 21.8227 5.61735 21.8227C5.16335 21.8227 4.71411 21.7301 4.29708 21.5507C3.88006 21.3712 3.504 21.1086 3.19187 20.7789C2.87975 20.4492 2.63813 20.0594 2.48175 19.6332C2.32536 19.207 2.25751 18.7533 2.28234 18.3V12.67Z"
                                            stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path
                                            d="M8.97076 18.3C8.96813 18.7399 9.05217 19.176 9.21809 19.5835C9.38402 19.9909 9.62857 20.3617 9.93779 20.6747C10.247 20.9876 10.6148 21.2366 11.0203 21.4073C11.4257 21.5781 11.8608 21.6674 12.3008 21.67H16.4208C17.3814 21.6693 18.316 21.357 19.0841 20.78C19.8522 20.203 20.4125 19.3924 20.6808 18.47L22.1808 13.39C22.3002 13.0523 22.3372 12.691 22.2889 12.3361C22.2405 11.9812 22.1081 11.643 21.9028 11.3496C21.6974 11.0562 21.4249 10.816 21.108 10.6491C20.7911 10.4822 20.4389 10.3934 20.0808 10.39H14.5608V5.10999C14.5621 4.91825 14.5256 4.72818 14.4535 4.55054C14.3813 4.3729 14.2749 4.21121 14.1402 4.07471C14.0056 3.9382 13.8454 3.82953 13.6687 3.75494C13.4921 3.68036 13.3025 3.64132 13.1108 3.64001V3.64001C12.7953 3.64144 12.4889 3.74572 12.2381 3.93701C11.9872 4.1283 11.8056 4.39617 11.7208 4.70001L8.97076 13.86"
                                            stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </g>

                                </svg>
                                <div
                                    class="absolute hidden group-hover:flex group-hover:flex-col -left-5 -top-2 -translate-y-full w-48 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-700">
                                    <p v-if="tsop?.likes.length > 0" v-for="like in tsop?.likes" :key="like">
                                        {{ like}}
                                    </p>
                                    <p v-else>
                                        No like
                                    </p>
                                </div>
                            </button>



                        </div>
                        <div class="p-2 my-5">
                            <form @submit.prevent="handleCommentSubmit" action=""
                                class="w-full p-1 gap-2 flex flex-col">
                                <h3 class="text-lg font-semibold">Make a comment</h3>
                                <textarea v-model="comment" type="text"
                                    class="w-full border-slate-400 border-2 rounded-lg h-[120px] resize-none p-2 drop-shadow-md">
                                </textarea>
                                <button class="p-2 bg-blue-500 text-white rounded-lg self-end text-md"> Submit</button>
                            </form>

                            <h3 class="text-lg font-semibold">Comment section</h3>
                            <ul class="ms-2 my-3 ">
                                <li v-for="commt in tsop?.commt"
                                    class="text-wrap break-al text-black flex flex-col drop-shadow-lg p-3 gap-3 border-b-2">
                                    <div class="flex gap-2 justify-start w-full">
                                        <img :src="commt?.pfp" alt="" class="w-12 h-12 rounded-full drop-shadow-lg">
                                        <div>
                                            <p>{{ commt?.disName }}</p>
                                            <p class="text-sm font-light text-slate-500">{{ commt?.email }}</p>
                                        </div>
                                        <!-- future update -->
                                        <!-- <div v-show="commt?.email === auth?.user?.email" class="ms-auto space-x-5">
                                            <button>Edit</button>
                                            <button>Delete</button>
                                        </div> -->
                                    </div>
                                    <p class="p-2 ms-5 break-all">
                                        {{ commt?.text }}
                                    </p>
                                </li>
                            </ul>
                        </div>

                    </section>
                </section>

            </div>
        </div>

    </KeepAlive>
    <Teleport to="#app">
        <div v-show="openOrNot" class="w-full h-full fixed grid grid-cols-1 place-items-center">

            <updatePostModal @open="modalHandler" :text="tsop?.content?.text" :id="route.params.id"
                @refresh="getPost" />
            <div @click="modalHandler" class="w-full h-screen fixed bg-black opacity-80 z-0"></div>
        </div>
    </Teleport>
</template>