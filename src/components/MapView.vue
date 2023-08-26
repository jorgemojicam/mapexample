<template>
  <div class="map-container">
    <div id="map" class="map"></div>

    <v-btn
      icon="mdi-plus"
      size="large"
      color="indigo"
      location="bottom right"
      style="bottom: 30px; right: 20px"
      position="absolute"
      @click="addPoint"
    ></v-btn>
  </div>
  <Dialog :open="openModal" :lat="lat" :lon="lon" @close="closeModal" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import "ol/ol.css";
import { Map, View } from "ol";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat, transform } from "ol/proj";
import { Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { Style, Icon } from "ol/style";
import TileLayer from "ol/layer/Tile";
import Dialog from "./Dialog.vue";
import PodasLocal from "../services/PodasLocal";

export default defineComponent({
  name: "MapView",
  components: {
    Dialog,
  },
  setup() {
    const map = ref<Map | null>(null);
    const openModal = ref(false);
    const source = new VectorSource();
    const lat = ref();
    const lon = ref();

    const vectorLayer = new VectorLayer({
      source: source,
    });

    const view = new View({
      center: fromLonLat([-73.0930381, 7.0647528]),
      zoom: 8,
    });

    const pointStyle = new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        src: "src/assets/marker.png",
      }),
    });

    const closeModal = () => {
      openModal.value = false;
    };

    onMounted(() => {
      loadPoints();
      map.value = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          vectorLayer,
        ],
        view: view,
      });
    });

    const loadPoints = () => {
      const podas = PodasLocal.getAll();

      for (var i = 0; i < podas.length; i++) {
        var iconFeature = new Feature({
          geometry: new Point(
            transform(
              [podas[i].lon, podas[i].lat],
              "EPSG:4326",
              "EPSG:3857"
            )
          ),
        });

        iconFeature.setStyle(pointStyle);
        source.addFeature(iconFeature);
      }
    };

    const addPoint = () => {
      navigator.geolocation.getCurrentPosition(
        (succes: { coords: any }) => {
          const crd = succes.coords;

          lon.value = crd.longitude; // Replace with desired longitude
          lat.value = crd.latitude; // Replace with desired latitude

          const pointFeature = new Feature({
            geometry: new Point(fromLonLat([lon.value, lat.value])),
          });

          pointFeature.setStyle(pointStyle);
          source.addFeature(pointFeature);
          view.setZoom(20);
          view.setCenter(fromLonLat([lon.value, lat.value]));
          openModal.value = true;
        },
        (error) => {
          console.log("error ", error);
        }
      );
    };

    return {
      addPoint,
      openModal,
      closeModal,
      lat,
      lon,
    };
  },
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}

.map {
  width: 100%;
  height: 90vh;
}
</style>
