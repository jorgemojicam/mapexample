<template>
  <v-row justify="center">
    <v-dialog v-model="open" persistent width="1024">
      <v-card>
        <v-card-title>
          <span class="text-h5">Registro de poda</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6" xs="6">
                <v-text-field
                  :value="lat"
                  readonly
                  hint="Latitud"
                  persistent-hint
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" xs="6">
                <v-text-field
                  :value="lon"
                  hint="Longitud"
                  readonly
                  persistent-hint
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  label="Codigo Arbol"
                  required
                  v-model="codigo"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  label="Dimenciones"
                  required
                  hint="Altura"
                  v-model="altura"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  label="DAP*"
                  hint="DAP"
                  persistent-hint
                  v-model="dap"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="4">
                <v-select
                  :items="['Oiti', 'Ficus', 'Guayacan', 'Gallinero']"
                  label="Especie*"
                  v-model="especie"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" md="4" sm="4">
                <v-autocomplete
                  :items="['Bueno', 'Regular', 'Malo']"
                  label="Estado Fisico"
                  v-model="estadofisico"
                  required
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="4" sm="4">
                <v-autocomplete
                  :items="['Bueno', 'Regular', 'Malo']"
                  label="Estado Sanitario"
                  v-model="estadosanitario"
                  required
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="12">
                <v-autocomplete
                  :items="[
                    'Realce',
                    'Descope',
                    'Fitosanitaria',
                    'Aclareo',
                    'Formación',
                    'Ramas laterales',
                    'Compensación',
                    'Eliminación ramas secas',
                  ]"
                  label="Tipo de Poda"
                  required
                  multiple
                  v-model="tipopoda"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*Complete todos los registros</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            type="button"
            variant="elevated"
            @click="save"
          >
            Guardar
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="$emit('close')">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import PodasLocal from "../services/PodasLocal";

export default defineComponent({
  props: {
    open: Boolean,
    lat: String,
    lon: String,
  },
  setup(props) {
    const codigo = ref("");
    const altura = ref("");
    const dap = ref("");
    const especie = ref("");
    const estadofisico = ref("");
    const estadosanitario = ref("");
    const tipopoda = ref([]);

    const save = () => {
      const podas = {
        codigo: codigo.value,
        altura: altura.value,
        dap: dap.value,
        especie: especie.value,
        estadofisico: estadofisico.value,
        estadosanitario: estadosanitario.value,
        tipopoda: tipopoda.value,
        lat: props.lat,
        lon: props.lon,
      };
      console.log(podas);
      PodasLocal.create(podas);
    };
    return {
      save,
      codigo,
      altura,
      dap,
      especie,
      estadofisico,
      estadosanitario,
      tipopoda,
    };
  },
});
</script>
