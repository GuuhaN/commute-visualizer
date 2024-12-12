import { getLocationDetails } from "@/api/osm";
import { OSMAddress, OSMLocation } from "@/types/osmTypes";
import { OVEntry } from "@/types/ovEntry";
import { OVHistory } from "@/types/ovHistory";
import { OVStats } from "@/types/ovStats";
import _ from "lodash";
import { Ref, ref, watchEffect } from "vue";

export function useOvStats(history: Ref<OVHistory>) {
  const stats = ref<OVStats>({
    totalCost: 0,
    totalDistance: 0,
    mostVisitedLocation: "",
    differentLocations: 0,
  });

  const locations = ref<OSMLocation[]>([]);

  const fetchLocations = () => {
    locations.value = [];

    const filteredLocations = [
      ...new Set(history.value.entries.map((entry: OVEntry) => entry.vertrek)),
    ].filter(
      (locationName) =>
        locationName !== "" &&
        locationName !== undefined &&
        !locationName.includes("(")
    );

    filteredLocations.map((locationName) => {
      const foundCommutes = history.value.entries.filter(
        (entry: OVEntry) => entry.vertrek === locationName
      );

      const datesVisited = foundCommutes.map((entry: OVEntry) => entry.datum);

      const foundOSM = getLocationDetails(locationName).then(
        (location: OSMAddress) => location
      );

      foundOSM.then((location) => {
        locations.value.push({
          locationName: locationName,
          latLng: {
            lat: parseFloat(location.lat),
            lng: parseFloat(location.lon),
          },
          amountTimesVisited: foundCommutes.length,
          datesVisited: datesVisited,
        });
      });
    });
  };

  return { stats, locations, fetchLocations };
}
