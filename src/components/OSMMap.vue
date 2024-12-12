<template>
  <div class="w-full max-w-4xl bg-green-200 h-[800px] border shadow-md">
    <l-map ref="map" :zoom="zoom" :min-zoom="8" :center="center" :max-zoom="15"
      ><l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-marker
        v-for="location in locations"
        :lat-lng="location.latLng"
        :key="location.locationName"
      >
        <l-popup>
          <div class="flex flex-col gap-0 tracking-wider">
            <div class="text-xl font-bold">{{ location.locationName }}</div>
            <div class="flex">
              Location: {{ location.latLng.lat }} {{ location.latLng.lng }}
            </div>
            <div>Dates visited: {{ location.datesVisited }}</div>
            <div>Visits: {{ location.amountTimesVisited }}</div>
          </div>
        </l-popup></l-marker
      >
      <l-polyline
        :lat-lngs="locations.map((item) => item.latLng)"
        :weight="2"
        :color="'#' + Math.floor(Math.random() * 16777215).toString(16)"
      />
    </l-map>
  </div>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import {
  LMap,
  LTileLayer,
  LMarker,
  LPolyline,
  LPopup,
} from "@vue-leaflet/vue-leaflet";
import { ref, defineProps, onBeforeMount, toRefs } from "vue";
import { OSMLatLng } from "@/types/osmTypes";
import { OVHistory } from "@/types/ovHistory";
import { useOvStats } from "@/composables/useOvStats";

interface Props {
  history: OVHistory;
}

const props = defineProps<Props>();
const { history } = toRefs(props);
const center = ref<OSMLatLng>({
  lat: 52.100935834456656,
  lng: 5.646243167294195,
});

const zoom = ref<number>(9);

const { locations, fetchLocations } = useOvStats(history);

onBeforeMount(() => {
  console.log(fetchLocations());
});
</script>
