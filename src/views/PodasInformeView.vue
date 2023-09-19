<template>
  <div v-for="item of datalist" style="overflow-x: scroll">
    <div class="pagecontainer">
      <v-container>
        <v-row>
          <v-col cols="5">
            <strong>{{ item.codigo }}</strong> <br /><br />
            <small> FORMATO PDA VERSION 01</small><br />
            <br />
            <b> INFORME MENSUAL</b><br />
            <b> PODA DE ÁRBOLES</b>
          </v-col>
          <v-col style="text-align: center" cols="7">
            <img :src="logo" />
          </v-col>
        </v-row>
        <hr class="mt-5" />
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
        <hr class="mt-5" />
        <v-row class="mt-5">
          <v-col cols="5" class="coltitle"> Codigo Arbol </v-col>
          <v-col cols="2" class="coldata"></v-col>
          <v-col cols="5" class="coldata">{{ item.codigo }}</v-col>
        </v-row>

        <v-row class="mt-8">
          <v-col cols="5" class="coltitle"> Coordenadas </v-col>
          <v-col cols="2" class="coldata"></v-col>
          <v-col cols="5" class="coltitle"> Dimenciones </v-col>
          <v-col cols="7" class="coldata"><strong>N</strong> </v-col>
          <v-col cols="5" class="coldata">ALTURA TOTAL</v-col>
          <v-col cols="7" class="coldata">{{ item.lat }}</v-col>
          <v-col cols="5" class="coldata">{{ item.altura }}</v-col>
          <v-col cols="7" class="coldata"><strong>W</strong></v-col>
          <v-col cols="5" class="coldata">DAP</v-col>
          <v-col cols="7" class="coldata">{{ item.lon }}</v-col>
          <v-col cols="5" class="coldata">{{ item.dap }}</v-col>
        </v-row>
        <hr class="mt-5" />
        <v-row class="mt-5">
          <v-col cols="5" class="coltitle"> Estado Fisico </v-col>
          <v-col cols="2" class="coldata"></v-col>
          <v-col cols="5" class="coltitle"> Estado Sanitario </v-col>
          <v-col cols="7" class="coldata"
            ><v-icon
              icon="mdi-checkbox-marked-outline"
              v-if="item.estadofisico == 'Bueno'"
            ></v-icon
            ><v-icon v-else icon="mdi-checkbox-blank-outline"></v-icon>Bueno
          </v-col>
          <v-col cols="5" class="coldata"
            ><v-icon
              icon="mdi-checkbox-marked-outline"
              v-if="item.estadosanitario == 'Bueno'"
            ></v-icon
            ><v-icon v-else icon="mdi-checkbox-blank-outline"></v-icon
            >Bueno</v-col
          >
          <v-col cols="7" class="coldata"
            ><v-icon
              icon="mdi-checkbox-marked-outline"
              v-if="item.estadofisico == 'Malo'"
            ></v-icon
            ><v-icon v-else icon="mdi-checkbox-blank-outline"></v-icon
            >Malo</v-col
          >
          <v-col cols="5" class="coldata"
            ><v-icon
              icon="mdi-checkbox-marked-outline"
              v-if="item.estadosanitario == 'Malo'"
            ></v-icon
            ><v-icon v-else icon="mdi-checkbox-blank-outline"></v-icon
            >Malo</v-col
          >
          <v-col cols="7" class="coldata"
            ><v-icon
              icon="mdi-checkbox-marked-outline"
              v-if="item.estadofisico == 'Regular'"
            ></v-icon
            ><v-icon v-else icon="mdi-checkbox-blank-outline"></v-icon
            >Regular</v-col
          >
          <v-col cols="5" class="coldata"
            ><v-icon
              icon="mdi-checkbox-marked-outline"
              v-if="item.estadosanitario == 'Regular'"
            ></v-icon
            ><v-icon v-else icon="mdi-checkbox-blank-outline"></v-icon
            >Regular</v-col
          >
        </v-row>
        <v-row class="mt-5">
          <v-col cols="12" class="coltitle"> Tipo de Poda</v-col>
          <v-col cols="4" class="coldata">Realce</v-col>
          <v-col cols="4" class="coldata">Aclareo</v-col>
          <v-col cols="4" class="coldata">Compensación</v-col>
          <v-col cols="4" class="coldata">Descope</v-col>
          <v-col cols="4" class="coldata">Formación</v-col>
          <v-col cols="4" class="coldata">Eliminación</v-col>
          <v-col cols="4" class="coldata">Fitosanitaria</v-col>
          <v-col cols="4" class="coldata">Ramas laterales</v-col>
        </v-row>
        <v-row class="mt-5">
          <v-col cols="12" class="coltitle"> Observaciones</v-col>
          <v-col cols="12" class="coldata">texto....</v-col>
        </v-row>
        <v-row class="mt-8">
          <v-col style="margin-right: 5px" class="coltitle">
            Vista antes de la intervención
          </v-col>
          <v-col style="margin-right: 5px; font-size: small" class="coltitle">
            Vista después de la intervención</v-col
          >
          <v-col style="margin-right: 5px; font-size: small" class="coltitle"
            >Vista del código del árbol</v-col
          >
        </v-row>
        <hr class="mt-5" />
        <v-row class="mt-8">
          <v-col cols="4" class="coldata">
            <img :src="firma" />
            <strong>
              Elaboró: JUAN PABLO VEGA MARTINEZ <br />
              T.P.: 151226-0539910 STD <br />
              V.º B.º
            </strong>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import logo from "../assets/logo-veolia.png";
import firma from "../assets/firmajp.png";
export default {
  props: {
    datalist: Object,
  },
  setup(props) {
    return {
      props,
      logo,
      firma
    };
  },
};
</script>
<style src="./informe.css" lang="scss" />
