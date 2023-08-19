<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>
  <router-link to="/">Home</router-link> | 
  <router-link to="/counter">Counter</router-link> | 
  <router-link to="/olmap">OlMapa</router-link>
  <router-view></router-view>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>

  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
