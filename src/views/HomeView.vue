<script lang="ts" setup>
import { useCounterStore } from '../stores/counter'

const counterStore = useCounterStore()


</script>
<template>
    <h1>Home: {{ counterStore.counter }}</h1>
    <h3>Numero de cambios: {{counterStore.numberOfChanges}}</h3>
</template>

