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
    zoom: 12.6, // initial zoom level, 0 is the world view, higher values zoom in
    center: [-73.90489, 40.69451], // center the map on this longitude and latitude
    interactiveLayerIds: ['cd304_lihtc'] // Make the LIHTC layer clickable
});

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

    map.addSource('cd_shadow', {
        type: 'geojson',
        data: './data/cd_boundaries_shading_simplified.geojson'
    })

    // see class 4 for adding the points properly and to do data-driven styling

    map.addLayer({
        id: 'cd304_lihtc',
        type: 'circle',
        source: 'lihtc_data',
        layout: {},
        paint: { 'circle-color': '#e55e55' },
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

    map.addLayer({
        id: 'cd_shadow_layer',
        type: 'fill',
        source: 'cd_shadow',
        layout: {},
        'paint': {
            'fill-color': '#545454', // blue color fill
            'fill-opacity': 0.5,
        }
    })

    map.addLayer({
        id: 'cd304_lihtc_highlight',
        type: 'circle',
        source: 'lihtc_data',
        layout: {},
        paint: {
            'circle-color': '#ff0000',
            'circle-outline-color': '#ffffff',
            'circle-radius': 6,
        },
        filter: ['==', 'address', '']
    })

    map.addLayer({
        id: 'cd304_colp_highlight',
        type: 'circle',
        source: 'vacant_colp_data',
        layout: {},
        paint: {
            'circle-color': '#ff0000',
            'circle-outline-color': '#ffffff',
            'circle-radius': 6,
        },
        filter: ['==', 'address', '']
    })

}); 

map.on('click', 'cd304_lihtc', (e) => {
    if (e.features.length > 0) { 
        // Get the clicked feature's properties from the GeoJSON
        const properties = e.features[0].properties;

        // Extracting data from the properties to display in the info box
        const projectName = properties.project_name;
        const address = properties.address;
        const liUnits = properties.total_low_income_units;
        const totalUnits = properties.total_num_of_units;
        const field1 = properties.field_1;
        const owner = properties.ownername;

        // Update the info_box with the feature data
        document.getElementById('existing-lihtc-div').style.display = 'unset';

        document.getElementById('info-title').textContent = projectName;
        document.getElementById('info-address').textContent = address;
        document.getElementById('info-owner').textContent = 'Owned by: ' + owner;

        document.getElementById('info-li-units').textContent = liUnits;
        document.getElementById('info-total-units').textContent = totalUnits;

        // Makes the clear info button visible
        document.getElementById('clear-info-button').style.visibility = 'visible';
        // Hides the select something nudge text
        document.getElementById('select-something-nudge').style.visibility = 'hidden';

        // Highlights the clicked feature on the map
        map.setFilter('cd304_lihtc_highlight', ['==', ['get', 'field_1'], field1]);

    } else {
        document.getElementById('info-title').textContent = 'Select a project to see its details';
        document.getElementById('info-address').textContent = '-';
        document.getElementById('info-li-units').textContent = '-';
        document.getElementById('info-total-units').textContent = '-';
        document.getElementById('info-owner').textContent = '-';
    }
});

map.on('click', 'cd304_colp', (e) => {
    if (e.features.length > 0) {
        // Get the clicked feature's properties from the GeoJSON
        const properties = e.features[0].properties;

        // Extracting data from the properties to display in the info box 
        const colpAddress = properties.ADDRESS;
        const owner = properties.ownername;
        const zoning = properties.zonedist1;
        const far = properties.residfar;
        const size = properties.lotarea;
        const valuation = properties.assesstot;
        const estUnits = properties.estunits;

        // Update the info_box with the feature data
        document.getElementById('colp-parcel-div').style.display = 'unset';

        document.getElementById('colp-address').textContent = colpAddress;
        document.getElementById('colp-owner').textContent = 'Owner: ' + owner;
        document.getElementById('colp-zoning').textContent = 'Residential Zoning: ' + zoning;
        document.getElementById('colp-far').textContent = 'Residential FAR: ' + far;
        document.getElementById('colp-parcel-size').textContent = 'Parcel Size (sq ft): ' + size;
        document.getElementById('colp-land-val').textContent = 'Assessed Value: $' + valuation;
        document.getElementById('colp-est-units').textContent = 'Estimated Units: ' + estUnits;

        // Makes the clear info button visible
        document.getElementById('clear-info-button').style.visibility = 'visible';
        // Hides the select something nudge text
        document.getElementById('select-something-nudge').style.visibility = 'hidden';

        // Highlights the clicked feature on the map
        map.setFilter('cd304_colp_highlight', ['==', ['get', 'field_1'], field1]);

    } else {
        document.getElementById('colp-address').textContent = '-';
        document.getElementById('colp-owner').textContent = '-';
        document.getElementById('colp-zoning').textContent = '-';
        document.getElementById('colp-far').textContent = '-';
        document.getElementById('colp-parcel-size').textContent = '-';
        document.getElementById('colp-land-val').textContent = '-';
        document.getElementById('colp-est-units').textContent = '-';
    }
});

const clearInfoButton = document.getElementById('clear-info-button');

// Setting what the clear info button does - removes map filter and data from info box
clearInfoButton.addEventListener('click', function () {
    document.getElementById('existing-lihtc-div').style.display = 'none';
    document.getElementById('colp-parcel-div').style.display = 'none';
    document.getElementById('clear-info-button').style.visibility = 'hidden';
    document.getElementById('select-something-nudge').style.visibility = 'visible';
    map.setFilter('cd304_lihtc_highlight', false);
    map.setFilter('cd304_colp_highlight', false);
})

map.on('mouseover', 'cd304_lihtc', (e) => {
    map.getCanvas().style.cursor = 'pointer';
})

map.on('mouseleave', 'cd304_lihtc', () => {
    map.getCanvas().style.cursor = '';
});

map.on('mouseover', 'cd304_colp', (e) => {
    map.getCanvas().style.cursor = 'pointer';
})

map.on('mouseleave', 'cd304_colp', () => {
    map.getCanvas().style.cursor = '';
});