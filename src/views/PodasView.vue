<template>
  <v-container>
    <v-row class="mb-5">
      <v-col>
        <v-btn prepend-icon="mdi-file">Descargar Pdf </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <Table :datalist="podas" @selectPoda="onSelectionPoda" />
    </v-row>
    <v-row>
      <PodasInformeView :datalist="arrPodas"/>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import PodasLocal from "../services/PodasLocal";
import Table from "../components/Table.vue";
import PodasInformeView from "./PodasInformeView.vue";


export default defineComponent({
  components: {
    Table,
    PodasInformeView
},
  setup() {
    const podas = ref({});
    const arrPodas = ref([] as any);

    onMounted(() => {
      podas.value = PodasLocal.get();
      console.log(podas.value);
    });

    const onSelectionPoda = (selected: any) => {
      arrPodas.value = selected;
      console.log("entro ", arrPodas.value);
    };

    return {
      podas,
      arrPodas,
      onSelectionPoda,
    };
  },
});
</script>
