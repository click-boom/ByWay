export default class LocationModel {
  #location_name;
  #longitude;
  #latitude;

  constructor(location_name, longitude, latitude) {
    this.#location_name = location_name;
    this.#longitude = longitude;
    this.#latitude = latitude;
  }

  getLocation_name() {
    return this.#location_name;
  }

  setLocation_name(value) {
    this.#location_name = value;
  }

  getLongitude() {
    return this.#longitude;
  }

  setLongitude(value) {
    this.#longitude = value;
  }

  getLatitude() {
    return this.#latitude;
  }

  setLatitude(value) {
    this.#latitude = value;
  }
}
