<script setup lang="ts">


import { useCounterStore } from '../stores/counter'

const counterStore = useCounterStore();

</script>


<template>
    <h1>Counter</h1>

    <button @click="counterStore.incrementBy(1)">incremento</button>
    {{ counterStore.counter }}
</template>

