export interface OSMAddress {
  place_id: string;
  license: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addressType: string;
  name: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  display_name: string;
  boundingBox: string[];
}

export interface OSMLocation {
  locationName?: string;
  amountTimesVisited: number;
  datesVisited?: Date[];
  latLng: OSMLatLng;
}

export interface OSMLatLng {
  lat: number;
  lng: number;
}
