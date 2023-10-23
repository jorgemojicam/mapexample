import { defineStore } from "pinia";
//import { IUser } from "../models/user";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: undefined,
    isAuthenticate: false,
    loading: false,
  }),
  actions: {
    signin(data: any) {
      this.user = data;
    },
    signup(data: any) {
      this.user = data;
    },
    showLoading(){
        this.loading = true;
    },
    hideLoading(){
        this.loading = false;
    }
  },
});
