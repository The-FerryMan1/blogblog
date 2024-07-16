<script setup>

</script>

<template>
    <div class="grid grid-cols-1 place-items-center w-full h-full">
        <div class="grid grid-cols-1 place-items-center">
            <img src="/src/assets/404.png" class="object-contain drop-shadow-lg h-[18.5rem] w-[18.5rem]"  alt="">
            <h2 class="text-3xl font-mono font-semibold">Opsss... Page not found!</h2>
            <router-link to="/" class="text-blue-800 underline text-lg">Back to home</router-link>
        </div>
    </div>
</template>
