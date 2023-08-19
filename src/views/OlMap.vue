<script lang="ts">
import hereIcon from "../assets/marker.png";
import { ref } from "vue";
import type { View } from "ol";
import type { ObjectEvent } from "ol/Object";
import Feature from "ol/Feature";
import { Point } from "ol/geom";

export default {
    setup() {
        const center = ref([-72.37680765389284, 7.445649760404725]);
        const projection = ref("EPSG:4326");
        const zoom = ref(7);
        const rotation = ref(0);
        const view = ref<View>();
        const map = ref(null);
        const pos = ref([0, 0]);
        const features = [new Feature({
            geometry: new Point([
                38.65533828735357,
                38.09172439575201,
            ])
        }),
        new Feature({
            geometry: new Point([
                39.00511550903326,
                38.11749267578125,
            ])
        }),
        new Feature({
            geometry: new Point([
                38.95181274414068,
                37.74911117553711,
            ])
        })
        ];


        function geoLocChange(event: ObjectEvent) {
            pos.value = event.target.getPosition();
            console.log("entro", event.target.getPosition());
            view.value?.setCenter(event.target?.getPosition());
        }
        function centrar() {
            navigator.geolocation.getCurrentPosition(success, error, options);
        }

        const options = {
            enableHighAccuracy: true,
            timeout: 50000,
            maximumAge: 0,
        };

        const success = (posi: { coords: any; }) => {
            const crd = posi.coords;

            console.log("Your current position is:");
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);

            const lon = crd.longitude;
            const lat = crd.latitude;
            pos.value = [lat, lon]
            zoom.value = 10
            console.log('centrar ', lat)

        }
        function error(err: { code: any; message: any; }) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        return {
            center,
            projection,
            zoom,
            rotation,
            map,
            pos,
            hereIcon,
            geoLocChange,
            centrar,
            features
        }
    }
};
</script>
<template>
    <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="width:700px; height: 400px" ref="map">
        <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />

        <ol-tile-layer>
            <ol-source-osm />
        </ol-tile-layer>

        <ol-geolocation :projection="projection" @change:position="geoLocChange">
            <template>
                <ol-vector-layer :zIndex="2">
                    <ol-source-vector :features="features">
                        <ol-feature ref="positionFeature">
                            <ol-geom-point :coordinates="pos"></ol-geom-point>
                            <ol-style>
                                <ol-style-icon :src="hereIcon"></ol-style-icon>
                            </ol-style>
                        </ol-feature>
                    </ol-source-vector>
                </ol-vector-layer>
            </template>
        </ol-geolocation>
    </ol-map>
    <button type="button" @click="centrar">Centrar</button>
</template>
  
<style>
.overlay-content {
    background: red !important;
    color: white;
    box-shadow: 0 5px 10px rgb(2 2 2 / 20%);
    padding: 10px 20px;
    font-size: 16px;
}
</style>