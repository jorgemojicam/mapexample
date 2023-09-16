<template>
  <div class="map-container">
    <div id="map" class="map"></div>
    <div ref="popu" id="popup">
      <div ref="popupcontent">
        <v-card :title="datos.codigo" subtitle="Subtitle">
          <v-card-text>
            <v-table>
              <tbody>
                <tr>
                  <td>Nombre</td>
                  <td>{{ datos.especie }}</td>
                </tr>
                <tr>
                  <td>Altura</td>
                  <td>{{ datos.altura }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="closePopup">cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
    <v-btn
      icon="mdi-plus"
      size="large"
      color="indigo"
      location="bottom right"
      style="bottom: 40px; right: 30px"
      position="absolute"
      @click="addPoint"
    ></v-btn>
  </div>
  <Dialog :open="openModal" :location="dataLocation" @close="closeModal" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import "ol/ol.css";
import { Map, Overlay, View } from "ol";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat, transform } from "ol/proj";
import { Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { Style, Icon } from "ol/style";
import TileLayer from "ol/layer/Tile";
import Dialog from "./Dialog.vue";
import PodasLocal from "../services/PodasLocal";
import marker from "../assets/marker.png";
import markergreen from "../assets/markergreen.png";
import LocationsService from "../services/LocationsService";

export default defineComponent({
  name: "MapView",
  components: {
    Dialog,
  },
  setup() {
    const map = ref<Map | null>(null);
    const popu = ref<HTMLElement | undefined>(undefined);

    const openModal = ref(false);
    const source = new VectorSource();
    const source2 = new VectorSource();
    const dataLocation = ref({
      lat: 0,
      lon: 0,
      state: "",
      town: "",
      neighbourhood: "",
    });

    const datos = ref({
      codigo: "",
      especie: "",
      estadofisico: "",
      altura: "",
    });

    const vectorLayer = new VectorLayer({
      source: source,
    });
    const vectorLayer2 = new VectorLayer({
      source: source2,
    });

    const view = new View({
      center: fromLonLat([-73.0930381, 7.0647528]),
      zoom: 8,
    });
    // https://nominatim.openstreetmap.org/reverse?format=json&lon=-73.0930138&lat=7.0647709

    const pointStyle = new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        src: marker,
      }),
    });

    const pointStyleGreen = new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        src: markergreen,
      }),
    });

    const closeModal = () => {
      openModal.value = false;
    };

    onMounted(() => {
      loadPoints();

      const overlay = new Overlay({
        element: popu.value,
        autoPan: {
          animation: {
            duration: 250,
          },
        },
      });

      map.value = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          vectorLayer,
          vectorLayer2,
        ],

        view: view,
      });

      map.value.addOverlay(overlay);

      map.value?.on("click", function (evt) {
        const coordinate = evt.coordinate;
        const feature = map.value?.forEachFeatureAtPixel(
          evt.pixel,
          (feature) => {
            return feature;
          }
        );
        if (!feature) {
          return;
        }
        datos.value = feature.get("datos");
        overlay.setPosition(coordinate);
      });
    });

    const closePopup = () => {
      console.log("entro");

      return false;
    };

    const loadPoints = () => {
      const podas = PodasLocal.getAll();

      for (var i = 0; i < podas.length; i++) {
        var iconFeature = new Feature({
          geometry: new Point(
            transform([podas[i].lon, podas[i].lat], "EPSG:4326", "EPSG:3857")
          ),
          datos: podas[i],
        });

        iconFeature.setStyle(pointStyleGreen);
        source2.addFeature(iconFeature);
      }
    };

    const addPoint = () => {
      navigator.geolocation.getCurrentPosition(
        (succes: { coords: any }) => {
          const crd = succes.coords;

          dataLocation.value.lon = crd.longitude; // Replace with desired longitude
          dataLocation.value.lat = crd.latitude; // Replace with desired latitude

          const pointFeature = new Feature({
            geometry: new Point(fromLonLat([dataLocation.value.lon, dataLocation.value.lat])),
          });

          pointFeature.setStyle(pointStyle);
          source.addFeature(pointFeature);
          view.setZoom(20);
          view.setCenter(fromLonLat([dataLocation.value.lon, dataLocation.value.lat]));

          LocationsService.get(dataLocation.value.lat.toString(), dataLocation.value.lon.toString()).then((res: any) => {
            if (res.status == 200 && res.data) {
              dataLocation.value.lat
              dataLocation.value.lon
              dataLocation.value.state = res.data.address.state;
              dataLocation.value.town = res.data.address.town;
              
              
            }
          });

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
      dataLocation,
      popu,
      datos,
      closePopup,
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
  height: 80vh;
}
</style>
