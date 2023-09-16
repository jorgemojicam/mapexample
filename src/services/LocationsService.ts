import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://nominatim.openstreetmap.org",
  headers: {
    "Content-type": "application/json",
  },
});

class LocationsService {
  get(lat: string | undefined, long: string | undefined): Promise<any> {
    return apiClient.get(`reverse?format=json&lon=${long}&lat=${lat}`);
  }
}

export default new LocationsService();
