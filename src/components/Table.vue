<template>
  <v-table fixed-header height="300px">
    <thead>
      <tr>
        <th class="text-left">Codigo</th>
        <th class="text-left">Municipio</th>
        <th class="text-left">Barrio</th>
        <th class="text-left">Especie</th>
        <th class="text-left">Fecha</th>
        <th class="text-left"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in props.datalist" :key="item.name">
        <td>{{ item.codigo }}</td>
        <td>{{ item.municipio }}</td>
        <td>{{ item.barrio }}</td>
        <td>{{ item.especie.nombre }} - {{ item.especie.nombrecientifico }}</td>
        <td>{{ item.fecha }}</td>
        <td>
          <v-checkbox-btn v-model="itemSelected" 
          :value="item"
          @change="$emit('selectPoda', itemSelected)"></v-checkbox-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  props: {
    datalist: Object,
  },
  
  setup(props) {
    const itemSelected = ref([])

    return {
      props,
      itemSelected
    };
  },
};
</script>
