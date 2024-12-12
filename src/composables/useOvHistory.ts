import { ref, Ref, toValue, watch, watchEffect } from "vue";
import Papa from "papaparse";
import { OVEntry } from "@/types/ovEntry";
import { camelize } from "@/helpers/stringTransformer";
import { OVHistory } from "@/types/ovHistory";

export function useOvHistory(file: Ref<File | null | undefined>) {
  const history = ref<OVHistory>({ entries: [], headers: [] });

  const setOvHistory = () =>
    file.value?.text().then((text) =>
      Papa.parse<OVEntry>(text, {
        header: true,
        transformHeader: (header) => {
          return camelize(header);
        },
        complete: (item) => {
          if (history.value !== undefined) {
            history.value.entries = item.data
              .map((value) => {
                const foundCommute =
                  item.data.find(
                    (item) =>
                      item.datum === value.datum &&
                      (item.vertrek === value.vertrek ||
                        item.vertrek === value.bestemming) &&
                      item.checkIn !== value.checkIn
                  ) ?? value;

                return {
                  ...value,
                  checkIn: foundCommute.checkIn,
                };
              })
              .filter(
                (value) =>
                  value.vertrek !== "" &&
                  value.bestemming !== "" &&
                  value.vertrek !== value.bestemming
              )
              .sort((a, b) => (a.datum > b.datum ? 1 : -1));
            history.value.headers = item.meta.fields ?? [];
          }
        },
      })
    );

  watchEffect(async () => await setOvHistory());

  return { history };
}
