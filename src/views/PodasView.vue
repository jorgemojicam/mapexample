<template>
  <Table :datalist="podas" />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import PodasLocal from "../services/PodasLocal";
import Table from "../components/Table.vue";

export default defineComponent({
  components: {
    Table,
  },
  setup() {
    const podas = ref({});
    onMounted(() => {
      podas.value = PodasLocal.get();
      console.log(podas.value);
    });

    return {
      podas,
    };
  },
});
</script>
