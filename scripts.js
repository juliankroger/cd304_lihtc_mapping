mapboxgl.accessToken = 'pk.eyJ1IjoiamFrOTMwNSIsImEiOiJjbW5pMnVrZm0wOTE2MnJwa3Zvc3JseWhnIn0.RTkBeX7djN2UCDyjipPyqg';

const map = new mapboxgl.Map({
    container: 'map_container',
    style: 'mapbox://styles/mapbox/standard', // Use the standard style for the map
    config: {
        basemap: {
            showPointOfInterestLabels: false,
            showAdminBoundaries: false,
            show3dObjects: false,
            show3dBuildings: false,
            show3dTrees: false,
            show3dLandmarks: false,
            showIndoorLabels: false
        }
    },
    projection: 'globe', // display the map as a globe
    zoom: 12.2, // initial zoom level, 0 is the world view, higher values zoom in
    center: [-73.91658, 40.69540] // center the map on this longitude and latitude
});

// add LIHTC project markers to map
// for (const feature of lihtc_projects.features) {
    // create a HTML element for each feature
   // const el = document.createElement('div');
   // el.className = 'marker';
    // make a marker for each feature and add to the map
   // new mapboxgl.Marker(el)
     //   .setLngLat(feature.geometry.coordinates).addTo(map)
       // .setPopup(
         //   new mapboxgl.Popup({ offset: 25 })
           //     .setText(feature.properties["Project.Name"])
//        );
// }

// Adding geojson data using js file method - need to change to reference json 
map.on('load', () => {

    map.addSource('lihtc_data', {
        type: 'geojson',
        data: './data/cd304_lihtc_clip.geojson'
    })

    // boundary cd304
    map.addSource('border_data', {
        type: 'geojson',
        data: './data/cd_boundaries.geojson'
    });

    // vacant colp points
    map.addSource('vacant_colp_data', {
        type: 'geojson',
        data: './data/cd304_vacant_colp_clip.geojson'
    })

    // see class 4 for adding the points properly and to do data-driven styling

    map.addLayer({
        id: 'cd304_lihtc',
        type: 'circle',
        source: 'lihtc_data',
        layout: {},
        paint: {}
    })

    map.addLayer({
        id: 'cd304_colp',
        type: 'circle',
        source: 'vacant_colp_data',
        layout: {},
        paint: {}
    })

    map.addLayer({
        id: 'cd304_boundary',
        type: 'line',
        source: 'border_data',
        layout: {}
    })

})