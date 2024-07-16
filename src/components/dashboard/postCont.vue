<script setup>
import { defineAsyncComponent } from 'vue';
const Poste = defineAsyncComponent(() => import('@/components/dashboard/poste.vue'))
const props = defineProps({
    post: Object
})
</script>

<template>
    <div v-for="post in props.post" :key="post.id"
        class="text-justify w-[95%] py-2 px-3 my-1 border-2 rounded-lg border-slate-800">
        <Poste :post="post" />
    </div>
</template>