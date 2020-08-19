// making map and tiles
const mymap = L.map("ISeeYouMap").setView([0, 0], 1);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

const marker = L.marker([0, 0]).addTo(mymap);

if ("geolocation" in navigator) {
  console.log("geolocation available!");
  // Getting the geolocation of the user...
  navigator.geolocation.getCurrentPosition(async (position) => {
    // setting vars that contain the lat and lon of the user's position...
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const location = [lat, lon];
    // Setting the marker
    marker.setLatLng(location);
    mymap.setView(location, 18);
    // Setting the lat and long in the html document
    document.getElementById("latitude").innerText = lat;
    document.getElementById("longitude").innerText = lon;
    // Creating a JSON format file for the data.
    const data = { lat, lon };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Puts data into a JSON format...
      body: JSON.stringify(data),
    };
    // async function for position. waits for the info to be fetched.
    const response = await fetch("/api", options);
    // puts the data into a json format.
    const json = await response.json();
    console.log(json);
  });
} else {
  console.log("geolocation not available...");
}
