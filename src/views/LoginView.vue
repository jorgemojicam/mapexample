<template>
  <v-container>
    <v-card title="Login" subtitle="Ingrese todos los datos">
      <v-card-text>
        <v-form fast-fail @submit.prevent="login">
          <v-text-field
            v-model="dataauth.username"
            label="Username"
            required
          ></v-text-field>

          <v-text-field
            v-model="dataauth.password"
            type="password"
            label="Contrasena"
            required
          ></v-text-field>

          <v-btn type="submit" block class="mt-2">Login</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import UserService from "../services/UserService";


export default defineComponent({
  components: {},
  setup() {
    const dataauth = ref({
      username: "",
      password: "",
    });

    onMounted(() => {
      console.log(dataauth.value);
    });

    const login = async () => {
      console.log(dataauth.value);
      const res = await UserService.signin(dataauth.value)
      console.log(res)
    };

    return {
      dataauth,
      login,
    };
  },
});
</script>
