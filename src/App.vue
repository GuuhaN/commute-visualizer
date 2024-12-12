<template>
  <div class="w-full">
    <div
      class="flex flex-row justify-center text-2xl md:text-4xl lg:text-6xl bg-gradient-to-r from-yellow-400 from-50% via-yellow-300 via-70% to-yellow-100 py-6"
    >
      <nav class="flex items-center">
        <span class="font-medium tracking-wide">Commute</span>
        <img width="72" src="./assets//logo.png" />
        <span class="tracking-widest">isualiser</span>
      </nav>
    </div>
    <div class="flex flex-col items-center w-full mt-4 tracking-wide gap-4">
      <div class="flex justify-center flex-col shadow-md p-4 border">
        <h1 class="text-2xl font-bold text-center">
          See how much you have commuted!
        </h1>
        <span class="font-thin"
          >Upload your commute from your
          <a
            href="https://www.ov-chipkaart.nl/mijn-ov-chip/mijn-ov-reishistorie?uid=mijn-ov-reishistorie"
            class="font-extrabold text-green-500"
            target="_blank"
            >OV travel history</a
          ></span
        >
        <div>
          <form class="flex flex-col gap-2" @submit.prevent="handleSubmit">
            <input
              type="file"
              class="p-2 border rounded bg-gradient-to-r from-green-400 from-50% via-green-300 via-70% to-green-100"
              accept="text/csv"
              @change="onFileChanged($event)"
            />
            <button
              :class="`p-2 border rounded font-semibold transition duration-1000 ease-in-out ${
                file
                  ? 'bg-yellow-300 text-black'
                  : 'text-gray-600 cursor-not-allowed'
              }`"
              type="submit"
              :disabled="!file"
            >
              <span class="flex justify-center">
                <img width="24" src="./assets//logo.png" />isualize
              </span>
            </button>
          </form>
        </div>
      </div>
      <div
        v-if="isSubmitted"
        class="flex flex-col max-w-lg text-center border p-4 w-full"
      >
        <h1 class="text-2xl font-bold">Your commute!</h1>
        <ul class="flex flex-col gap">
          <li>Total cost: €{{ stats?.totalCost }}</li>
          <li>Total distance: {{ stats?.totalDistance }} KM</li>
          <li>Most visited location: {{ stats?.mostVisitedLocation }}</li>
          <li>Number of location visited: {{ stats?.differentLocations }}</li>
        </ul>
        <div class="flex flex-row justify-center gap-2 font-semibold">
          <button
            class="bg-yellow-400 rounded p-2"
            @click="showHistory = !showHistory"
          >
            {{ !showHistory ? "Show" : "Hide" }} history table
          </button>
          <button
            class="bg-green-400 rounded p-2"
            @click="showCommute = !showCommute"
          >
            {{ !showCommute ? "Show" : "Hide" }} my commute
          </button>
        </div>
      </div>
      <div class="flex flex-row w-full justify-around gap-4 px-4 max-h-96">
        <div
          class="flex flex-col border border-slate-200 w-full animate-fadeIn"
          v-if="showHistory"
        >
          <table class="bg-green-100 table-auto border-collapse">
            <thead>
              <tr>
                <th
                  :key="headers"
                  v-for="headers in [...history.headers].splice(0, 6)"
                  class="font-bold capitalize text-start text-xl"
                >
                  {{ headers }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                :key="data.naam + data.kaartnummer + data.datum"
                v-for="data in history.entries"
              >
                <td class="font-bold">
                  {{ data.datum }}
                </td>
                <td>
                  {{ data.checkIn }}
                </td>
                <td>
                  {{ data.vertrek }}
                </td>
                <td>
                  {{ data.checkUit }}
                </td>
                <td>
                  {{ data.bestemming }}
                </td>
                <td>{{ data.bedrag ? `€ ${data.bedrag}` : "" }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <OSMMap v-if="showCommute" :history="history" />
      </div>
    </div>
  </div>
  <router-view />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { OVStats } from "./types/ovStats";
import OSMMap from "./components/OSMMap.vue";
// import CommuteVisualizerLoader from "./components/CommuteVisualizerLoader.vue";
import { useOvHistory } from "./composables/useOvHistory";
import { useOvStats } from "./composables/useOvStats";

const showHistory = ref<boolean>();
const showCommute = ref<boolean>();
const isSubmitted = ref<boolean>();

const file = ref<File | null>();

const stats = ref<OVStats>({
  totalCost: 0,
  totalDistance: 0,
  mostVisitedLocation: "",
  differentLocations: 0,
});

const { history } = useOvHistory(file);
const { locations, fetchLocations } = useOvStats(history);

async function onReset() {
  showHistory.value = false;
  showCommute.value = false;
  isSubmitted.value = false;
}

async function onFileChanged(event: Event) {
  let target = event.target as HTMLInputElement;

  if (target && target.files) {
    file.value = target.files[0];
  }

  await onReset();
}

async function handleSubmit() {
  isSubmitted.value = true;
}
</script>

<style src="./styles/index.css" />
