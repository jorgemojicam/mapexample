<template>
  <div id="app">
    <MapView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MapView from '../components/MapView.vue';

export default defineComponent({
  name: 'Captura',
  components: {
    MapView,
  },
});
</script>
