<script setup>
import navbar from '@/components/Comps/navBar.vue'
import footerist from '@/components/Comps/footerist.vue'
</script>

<template>
  <navbar v-once />


  <router-view></router-view>
  <!-- <footerist v-once /> -->
</template>


