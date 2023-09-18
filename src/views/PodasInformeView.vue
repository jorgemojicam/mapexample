<template>
  <div v-for="item of datalist">
    <div class="pagecontainer">
      <v-container>
        <v-row>
          <v-col cols="5">
            <strong>VXXXXX</strong> <br /><br />
            <small> FORMATO PDA VERSION 01</small><br />
            <br />
            INFORME MENSUAL<br />
            PODA DE ÁRBOLES
          </v-col>
          <v-col style="text-align: center" cols="7">
            <img :src="logo" />
          </v-col>
        </v-row>
        <hr class="mt-10" />
        <v-row class="mt-5">
          <v-col cols="3" class="coltitle"> Fecha </v-col>
          <v-col cols="1" class="coldata"></v-col>
          <v-col cols="3" class="coltitle"> Direccion </v-col>
          <v-col cols="1" class="coldata"></v-col>
          <v-col cols="3" class="coltitle"> Barrio </v-col>
          <v-col cols="4" class="coldata"> {{ item.fecha }} </v-col>
          <v-col cols="4" class="coldata"> {{ item.direccion }} </v-col>
          <v-col cols="4" class="coldata"> {{ item.barrio }} </v-col>
          <v-col cols="3" class="coltitle"> Especie </v-col>
          <v-col cols="1" class="coldata"></v-col>
          <v-col cols="3" class="coltitle"> Nombre Cientifico </v-col>
          <v-col cols="1" class="coldata"></v-col>
          <v-col cols="3" class="coltitle"> Municipio </v-col>
          <v-col cols="4" class="coldata"> {{ item.especie.nombre }} </v-col>
          <v-col cols="4" class="coldata">
            {{ item.especie.nombrecientifico }}
          </v-col>
          <v-col cols="4" class="coldata"> {{ item.municipio }} </v-col>
        </v-row>
        <hr class="mt-10" />
        <v-row class="mt-5">
          <v-col cols="5" class="coltitle"> Codigo Arbol </v-col>
          <v-col cols="2" class="coldata"></v-col>
          <v-col cols="5" class="coldata">{{ item.codigo }}</v-col>
        </v-row>
        
        <v-row class="mt-10">
          <v-col cols="5" class="coltitle"> Coordenadas </v-col>
          <v-col cols="2" class="coldata"></v-col>
          <v-col cols="5" class="coltitle"> Dimenciones </v-col>
          <v-col cols="7" class="coldata"><strong>N</strong> </v-col>
          <v-col cols="5" class="coldata">ALTURA TOTAL</v-col>
          <v-col cols="7" class="coldata">{{item.lat}}</v-col>
          <v-col cols="5" class="coldata">{{item.altura}}</v-col>
          <v-col cols="7" class="coldata"><strong>W</strong></v-col>
          <v-col cols="5" class="coldata">DAP</v-col>
          <v-col cols="7" class="coldata">{{item.lon}}</v-col>
          <v-col cols="5" class="coldata">{{item.dap}}</v-col>
        </v-row>
        <hr class="mt-10" />
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import logo from "../assets/logo-veolia.png";
export default {
  props: {
    datalist: Object,
  },
  setup(props) {
    return {
      props,
      logo,
    };
  },
};
</script>
<style src="./informe.css" lang="scss" />
