<template>
  <div v-for="item of datalist">
    <div class="pagecontainer">
      <v-container>
        <v-row>
          <v-col cols="6">
            VXXXXX <br />
            FORMATO PDA VERSION 01 <br />
            INFORME MENSUAL <br />
            PODA DE ÁRBOLES
          </v-col>
          <v-col style="text-align: center" cols="7">
            <img src="../../assets/logo-veolia.png" />
          </v-col>
        </v-row>
        <hr />
        <v-row>
          <v-col cols="4"> Fecha </v-col>
          <v-col cols="4"> Direccion </v-col>
          <v-col cols="4"> Barrio </v-col>
          <v-col cols="4">
            {{ item.fecha }}
          </v-col>
          <v-col cols="4"> {{ item.direccion }} </v-col>
          <v-col cols="4"> {{ item.barrio }} </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    datalist: Object,
  },
  setup(props) {
    return {
      props,
    };
  },
};
</script>
<style src="./informe.css" lang="scss" />
