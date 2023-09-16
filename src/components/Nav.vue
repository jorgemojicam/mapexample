<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>LocaliTree</v-toolbar-title>
        <v-spacer></v-spacer>
        
        <v-btn variant="text" icon="mdi-filter"></v-btn>
        <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" location="left" temporary>
        <!-- <v-list :items="items"></v-list> -->
        <v-list>   
          <v-list-item to="/captura">Registro Arbol</v-list-item>
        </v-list>
        <v-list>   
          <v-list-item to="/podas">Podas</v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 100%">
        <v-card-text>
          <router-view></router-view>
        </v-card-text>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "MapView",
  setup() {
    const drawer = ref(false);
    const group = ref(null);
    const items = [
      {
        title: "Buzz",
        value: "buzz",
      },
    ];

    watch(group, () => {
      drawer.value = false;
    });

    return {
      drawer,
      items,
      group,
    };
  },
});
</script>
