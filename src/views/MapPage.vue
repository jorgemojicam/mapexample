<template>
  <q-page>
    <l-map v-if="!loading" :markers="markers" />
  </q-page>
</template>
  
<script>
import { defineComponent, ref, onMounted } from 'vue'
import LMap from '../components/Map/LMap.vue'
//import { api } from 'boot/axios'

export default defineComponent({
  name: 'MapPage',
  components: {
    LMap
  },
  setup() {
    const markers = ref([])
    const loading = ref(true)

    onMounted(() => {
      handleGetList()
    })

    const handleGetList = async () => {
      try {
        loading.value = true
        //const { data } = await api.get('lugares')
        markers.value = [{ latitude: 7.12539, longitude: -73.1198 }]

        loading.value = false
      } catch (error) {
        console.error(error)
        loading.value = false
      }
    }

    return {
      markers,
      loading
    }
  }
})
</script>