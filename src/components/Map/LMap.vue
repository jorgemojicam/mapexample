<template>
  <div>
    <button type="button" @click="current"> esta ubicacion </button>
    <div id="mapContainer" />
  </div>
</template>
  
<script>
import { defineComponent, onMounted, onBeforeMount, ref } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export default defineComponent({
  name: 'LMap',
  props: {
    markers: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  setup(props) {
    let map = null
    const lat = ref(0)
    const long = ref(0)

    onMounted(() => {
      console.log(props.markers)

      createMapLayer()
    })

    onBeforeMount(() => {
      if (map) {
        map.remove()
      }
    })

    const createMapLayer = () => {

      navigator.geolocation.getCurrentPosition(success => {
        lat.value = success.coords.latitude;
        long.value = success.coords.longitude;
        
        map = L.map('mapContainer').setView([lat.value, long.value], 20)
        L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map)

        map.on('click', addMarker)

        if (props.markers.length) {
          setMarkers()
        }
      }, error);
    }

    const addMarker = (event) => {
      console.log(event.latlng)
    }

    const error = (err) => {
      console.log(error)
    };


    const setMarkers = () => {
      props.markers.map((marker) => {
        return L.marker([marker.latitude, marker.longitude]).addTo(map)
          .bindPopup(marker.descricao)
      })
    }

    return {
      lat,
      long
    }
  }
})
</script>
  
<style scoped>
#mapContainer {
  width: 100vw;
  height: calc(100vh - 50px);
}
</style>