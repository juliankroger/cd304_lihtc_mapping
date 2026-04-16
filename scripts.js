
mapboxgl.accessToken = 'MAPBOX_TOKEN_PLACEHOLDER';
const map = new mapboxgl.Map({
    container: 'map_container',
    style: 'mapbox://styles/mapbox/standard', // Use the standard style for the map
    projection: 'globe', // display the map as a globe
    zoom: 10, // initial zoom level, 0 is the world view, higher values zoom in
    center: [-73.91658, 40.69540] // center the map on this longitude and latitude
});

