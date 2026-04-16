
mapboxgl.accessToken = 'MAPBOX_TOKEN_PLACEHOLDER';
const map = new mapboxgl.Map({
    container: 'map_container',
    style: 'mapbox://styles/mapbox/standard', // Using standard style for map
    projection: 'globe', // need to change this!
    zoom: 10, // initial zoom 10 for now, will need to change
    center: [-73.91658, 40.69540] // centering the map on CD304
});

