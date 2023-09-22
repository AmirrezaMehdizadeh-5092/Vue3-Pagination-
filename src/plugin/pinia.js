import { defineStore } from "pinia";
import axios from "axios";

export const useStore = defineStore('my-store', {
    state: () => ({
        api: 'https://fakestoreapi.com',
        axiosGetResponose: []
    }),
    getters: {
        GetResponse(state) {
            return state.axiosGetResponose
        }
    },
    actions:
    {
        async getMethod(endpoint) {
            try {
                const data = await await axios.get(`${this.api}/${endpoint}`);
                this.axiosGetResponose = data.data;
            } catch (error) {
                this.axiosGetResponose = error
            }
        }
    }
})