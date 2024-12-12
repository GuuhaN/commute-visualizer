import { OSMAddress } from "@/types/osmTypes";
import axios from "axios";

export async function getLocationDetails(address: string, city?: string) {
  const query = !city ? `q=${address}` : `street=${address}&city=${city}`;

  return await axios
    .get<OSMAddress[]>(
      `http://localhost:8080/search?${query}&Addressdetails=1&format=json`
    )
    .then(
      (item) =>
        item.data.map((entry) => {
          const addressSplit = entry.display_name.split(/\s*,\s*/);
          return {
            ...entry,
            name: addressSplit[0],
            city: addressSplit[4],
            postalCode: addressSplit[7],
            province: addressSplit[5],
          };
        })[0]
    );
}
