<template>
  <v-dialog v-model="open" persistent width="1024">
    <v-card>
      <v-card-title>
        <span class="text-h5"
          >Registro de poda {{ datetoday.toLocaleDateString() }}</span
        >
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col class="form-control" cols="6" md="3" sm="6" xs="6">
              <v-text-field
                :value="location?.lat"
                readonly
                hint="Latitud"
                persistent-hint
              ></v-text-field>
            </v-col>
            <v-col class="form-control" cols="6" md="3" sm="6" xs="6">
              <v-text-field
                :value="location?.lon"
                hint="Longitud"
                readonly
                persistent-hint
              ></v-text-field>
            </v-col>
            <v-col class="form-control" cols="6" md="3" sm="6" xs="6">
              <v-text-field
                :value="location?.town"
                hint="Municipio"
                persistent-hint
              ></v-text-field>
            </v-col>
            <v-col class="form-control" cols="6" md="3" sm="6" xs="6">
              <v-text-field
                hint="Barrio"
                v-model="barrio"
                label="Barrio"
              ></v-text-field>
            </v-col>
            <v-col class="form-control" cols="12" md="6" sm="12" xs="12">
              <v-text-field
                hint="Direccion"
                v-model="direccion"
                label="Direccion"
              ></v-text-field>
            </v-col>
            <v-col class="form-control" cols="12" xs="12" sm="4" md="3">
              <v-text-field
                label="Codigo Arbol"
                required
                v-model="codigo"
              ></v-text-field>
            </v-col>
            <v-col class="form-control" cols="6" xs="6" sm="4" md="4">
              <v-text-field
                type="number"
                label="Dimenciones"
                required
                hint="Altura"
                v-model="altura"
              ></v-text-field>
            </v-col>
            <v-col class="form-control" cols="6" xs="6" sm="4" md="4">
              <v-text-field
                type="number"
                label="DAP*"
                hint="DAP"
                persistent-hint
                v-model="dap"
                required
              ></v-text-field>
            </v-col>
            <v-col class="form-control" cols="6" md="4" sm="4">
              <v-select
                :items="listEspecies"
                item-title="nombre"
                item-value="nombre"
                label="Especie*"
                return-object
                persistent-hint
                :hint="`${especie.nombrecientifico}`"
                v-model="especie"
                required
              >
                <template v-slot:prepend-item>
                  <v-list-item title="Seleccione"> </v-list-item>
                  <v-divider class="mt-2"></v-divider>
                </template>
              </v-select>
            </v-col>
            <v-col cols="6" md="4" sm="4">
              <v-autocomplete
                :items="['Bueno', 'Regular', 'Malo']"
                label="Estado Fisico"
                v-model="estadofisico"
                required
              ></v-autocomplete>
            </v-col>
            <v-col class="form-control" md="4" sm="4">
              <v-autocomplete
                :items="['Bueno', 'Regular', 'Malo']"
                label="Estado Sanitario"
                v-model="estadosanitario"
                required
              ></v-autocomplete>
            </v-col>
            <v-col class="form-control" sm="12">
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
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import PodasLocal from "../services/PodasLocal";

export default defineComponent({
  props: {
    open: Boolean,
    location: Object,
  },
  emits: ['close'],
  setup(props, { emit }) {
    const codigo = ref("");
    const altura = ref("");
    const dap = ref("");
    const especie = ref({} as any);
    const estadofisico = ref("");
    const estadosanitario = ref("");
    const tipopoda = ref([]);
    const municipio = ref("");
    const barrio = ref([]);
    const direccion = ref("");
    const datetoday = ref(new Date());
    const listEspecies = ref([] as any);    
    
    const getEspecies = () => {
      listEspecies.value = [
        {
          nombre: "Árbol de la cruz",
          nombrecientifico: "Brownea ariza",
        },
        {
          nombre: "Aguacate",
          nombrecientifico: "Persea americana",
        },
        {
          nombre: "Oití",
          nombrecientifico: "Licania tomentosa",
        },
        {
          nombre: "Olivo",
          nombrecientifico: "Bucida buceras",
        },
        {
          nombre: "Guayacán",
          nombrecientifico: "Tabebuia rosea",
        },
        {
          nombre: "Gallinero",
          nombrecientifico: "Pithecellobium dulce",
        },
        {
          nombre: "Guanábano",
          nombrecientifico: "Annona muricata",
        },
        {
          nombre: "Guayacán rosado",
          nombrecientifico: "Tabebuia rosea",
        },
        {
          nombre: "Mandarino",
          nombrecientifico: "Citrus reticulata",
        },
        {
          nombre: "Manzanita",
          nombrecientifico: "Malpighia glabra",
        },
        {
          nombre: "Mamoncillo",
          nombrecientifico: "Melicoccus bijugatus",
        },
        {
          nombre: "Palma areca",
          nombrecientifico: "Dypsis lutescens",
        },
        {
          nombre: "Palma navidad",
          nombrecientifico: "Adonidia merrillii",
        },
        {
          nombre: "Palma yuca",
          nombrecientifico: "Yucca gigantea",
        },
        {
          nombre: "Penitente",
          nombrecientifico: "Petrea volubilis",
        },
        {
          nombre: "Pomarroso brasilero",
          nombrecientifico: "Syzygium malaccense",
        },
        {
          nombre: "Neem",
          nombrecientifico: "Azadirachta indica",
        },
        {
          nombre: "Totumo",
          nombrecientifico: "Crescentia cujete",
        },
      ] as any;
    };

    onMounted(() => {
      getEspecies();
    });

    const save = () => {
      const podas = {
        codigo: codigo.value,
        altura: altura.value,
        dap: dap.value,
        especie: especie.value,
        estadofisico: estadofisico.value,
        estadosanitario: estadosanitario.value,
        tipopoda: tipopoda.value,
        lat: props.location?.lat,
        lon: props.location?.lon,
        municipio: props.location?.town,
        barrio: barrio.value,
        direccion: direccion.value,
        fecha: datetoday.value.toLocaleDateString(),
      };
      console.log(podas);
      PodasLocal.create(podas);      
      emit('close')
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
      municipio,
      datetoday,
      barrio,
      direccion,
      listEspecies,
    };
  },
});
</script>
