mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXN3aG9uZ21hcGJveCIsImEiOiJjbDl6bzJ6N3EwMGczM3BudjZmbm5yOXFnIn0.lPhc5Z5H3byF_gf_Jz48Ug'; // Replace with your token

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/standard',
    center: [-74.006, 40.7128], // New York City
    zoom: 10,
});


console.log(lineData); // Check if lineData is loaded correctly


map.on('load', () => {

    // add a line for the saunter route
    map.addSource('saunter-route', {
        type: 'geojson',
        data: lineData
    });

    // add a source for the borough boundaries
    map.addSource('borough-boundaries', {
        type: 'geojson',
        data: './data/boro-boundaries-six-digits.json'
    })

    // add a source for our random points
    map.addSource('random-points', {
        type: 'geojson',
        data: './data/rando-points.json'
    })

    // add a source for the pluto study area
    map.addSource('pluto-study-area', {
        type: 'geojson',
        data: './data/pluto-study-area.geojson'
    })

    map.addLayer({
        id: 'saunter-route-line',
        type: 'line',
        source: 'saunter-route',
        paint: {
            'line-color': '#4e75f5',
            'line-width': 4,
            'line-dasharray': [5, 1, 3, 1, 1],
            'line-opacity': 1
        }
    });

    // add a fill layer for the borough boundaries (below the line)
    map.addLayer({
        id: 'borough-boundaries-fill',
        type: 'fill',
        source: 'borough-boundaries',
        layout: {
            'visibility': 'visible'
        },
        slot: 'bottom',
        paint: {
            'fill-color': [
                'match',
                ['get', 'BoroName'],
                'Bronx', '#fbb03b',      // orange
                'Brooklyn', '#223b53',   // dark blue
                'Manhattan', '#e55e5e',  // red
                'Queens', '#3bb2d0',     // teal
                'Staten Island', '#56b881', // green
                /* other */ '#cccccc'    // gray fallback
            ],
            'fill-opacity': 0.18,
            'fill-outline-color': '#ffffff' // white border
        }
    });

    // add a line layer for the borough boundaries (above the fill)
    map.addLayer({
        id: 'borough-boundaries-line',
        type: 'line',
        source: 'borough-boundaries',
        layout: {
            'visibility': 'visible'
        },
        paint: {
            'line-color': '#333', // deep blue
            'line-width': 1.5,
            'line-opacity': 0.85
        }
    });

        // add a line layer for the borough boundaries (above the fill)
    map.addLayer({
        id: 'borough-boundaries-line-highlight',
        type: 'line',
        source: 'borough-boundaries',
        layout: {},
        paint: {
            'line-color': '#ff0000', // red
            'line-width': 3,
            'line-opacity': 1,
            'line-dasharray': [2, 2] // dashed line for highlight
        },
        filter: ['==', 'BoroName', ''] // start with no features highlighted
    });

    // add circle layer for random points   
    map.addLayer({
        id: 'random-points-circle',
        type: 'circle',
        source: 'random-points',
        layout: {
            'visibility': 'visible'
        },
        paint: {
            'circle-radius': 6,
            'circle-color': '#ff0000', // red
            'circle-opacity': 0.8
        }
    });

    // add a fill layer for the pluto study area
    map.addLayer({
        id: 'pluto-study-area-fill',
        type: 'fill',
        source: 'pluto-study-area',
        layout: {
            'visibility': 'visible'
        },
        paint: {
            'fill-color': [
                'match',
                ['get', 'LandUse'],
                '01', '#FEFFA8',
                '02', '#FCB842',
                '03', '#B16E00',
                '04', '#ff8341',
                '05', '#fc2929',
                '06', '#E362FB',
                '07', '#E0BEEB',
                '08', '#44A3D5',
                '09', '#78D271',
                '10', '#BAB8B6',
                '11', '#555555',
                '#EEEEEE'  // default fallback color
            ],
            'fill-opacity': 0.8,
            'fill-outline-color': '#222'
        }
    });

    // add a highlight line layer for selected study area polygon
    map.addLayer({
        id: 'pluto-study-area-highlight',
        type: 'line',
        source: 'pluto-study-area',
        layout: {},
        paint: {
            'line-color': '#3498db',
            'line-width': 4,
            'line-opacity': 1
        },
        filter: ['==', 'Address', ''] // start with no features highlighted
    });

    // fill-color expression for unitsres:
    // 'fill-color': [

});

// Land use lookup function
const LandUseLookup = (code) => {
  // Parse string code to integer (e.g., '03' -> 3)
  const numCode = parseInt(code, 10);
  
  switch (numCode) {
    case 1:
      return {
        color: '#f4f455',
        description: '1 & 2 Family',
      };
    case 2:
      return {
        color: '#f7d496',
        description: 'Multifamily Walk-up',
      };
    case 3:
      return {
        color: '#FF9900',
        description: 'Multifamily Elevator',
      };
    case 4:
      return {
        color: '#f7cabf',
        description: 'Mixed Res. & Commercial',
      };
    case 5:
      return {
        color: '#ea6661',
        description: 'Commercial & Office',
      };
    case 6:
      return {
        color: '#d36ff4',
        description: 'Industrial & Manufacturing',
      };
    case 7:
      return {
        color: '#dac0e8',
        description: 'Transportation & Utility',
      };
    case 8:
      return {
        color: '#5CA2D1',
        description: 'Public Facilities & Institutions',
      };
    case 9:
      return {
        color: '#8ece7c',
        description: 'Open Space & Outdoor Recreation',
      };
    case 10:
      return {
        color: '#bab8b6',
        description: 'Parking Facilities',
      };
    case 11:
      return {
        color: '#5f5f60',
        description: 'Vacant Land',
      };
    case 12:
      return {
        color: '#5f5f60',
        description: 'Other',
      };
    default:
      return {
        color: '#5f5f60',
        description: 'Other',
      };
  }
};

// Button event listeners
document.getElementById('landuse-btn').addEventListener('click', () => {
    map.setPaintProperty('pluto-study-area-fill', 'fill-color', [
        'match',
        ['get', 'LandUse'],
        '01', '#FEFFA8',
        '02', '#FCB842',
        '03', '#B16E00',
        '04', '#ff8341',
        '05', '#fc2929',
        '06', '#E362FB',
        '07', '#E0BEEB',
        '08', '#44A3D5',
        '09', '#78D271',
        '10', '#BAB8B6',
        '11', '#555555',
        '#EEEEEE'  // default fallback color
    ])
});

document.getElementById('units-btn').addEventListener('click', () => {
    map.setPaintProperty('pluto-study-area-fill', 'fill-color', [
        'interpolate',
        ['linear'],
        ['get', 'UnitsRes'],
        0, '#fee5d9',      // very light red
        10, '#fcae91',     // light red
        50, '#fb6a4a',     // medium red
        100, '#de2d26',    // red
        200, '#a50f15'     // dark red
    ])
});

// Location button event listeners
document.getElementById('bronx-btn').addEventListener('click', () => {
    map.flyTo({
        center: [-73.8648, 40.8448], // Bronx coordinates
        zoom: 12,
    })
});

document.getElementById('brooklyn-btn').addEventListener('click', () => {
    map.flyTo({
        center: [-73.9442, 40.6782], // Brooklyn coordinates
        zoom: 12,
    })
});

document.getElementById('manhattan-btn').addEventListener('click', () => {
    map.flyTo({
        center: [-73.9712, 40.7831], // Manhattan coordinates
        zoom: 12,
    })
});

document.getElementById('queens-btn').addEventListener('click', () => {
    map.flyTo({
        center: [-73.7949, 40.7282], // Queens coordinates
        zoom: 11,
    })
});

 

document.getElementById('staten-island-btn').addEventListener('click', () => {
    map.flyTo({
        center: [-74.1502, 40.5795], // Staten Island coordinates
        zoom: 12,
    })      
}
);

document.getElementById('east-village-btn').addEventListener('click', () => {
    map.fitBounds([
    [-73.98836, 40.72674],
    [-73.98019, 40.73068]
]);
});

// Tooltip functionality
const tooltip = document.getElementById('tooltip');

// Show tooltip on mouseenter
map.on('mouseenter', 'pluto-study-area-fill', (e) => {
    map.getCanvas().style.cursor = 'pointer';
    tooltip.style.display = 'block';
});

// Update tooltip position and content on mousemove
map.on('mousemove', 'pluto-study-area-fill', (e) => {
    if (e.features.length > 0) {
        const landUse = e.features[0].properties.LandUse;
        tooltip.innerHTML = `Land Use: ${LandUseLookup(landUse).description}`;
        tooltip.style.left = e.point.x + 15 + 'px';
        tooltip.style.top = e.point.y + 15 + 'px';
    }
});

// Hide tooltip on mouseleave
map.on('mouseleave', 'pluto-study-area-fill', () => {
    map.getCanvas().style.cursor = '';
    tooltip.style.display = 'none';
});

// Layer toggle checkboxes
document.getElementById('borough-toggle').addEventListener('change', (e) => {
    const visibility = e.target.checked ? 'visible' : 'none';
    map.setLayoutProperty('borough-boundaries-fill', 'visibility', visibility);
    map.setLayoutProperty('borough-boundaries-line', 'visibility', visibility);
});

document.getElementById('study-area-toggle').addEventListener('change', (e) => {
    const visibility = e.target.checked ? 'visible' : 'none';
    map.setLayoutProperty('pluto-study-area-fill', 'visibility', visibility);
});

document.getElementById('circles-toggle').addEventListener('change', (e) => {
    const visibility = e.target.checked ? 'visible' : 'none';
    map.setLayoutProperty('random-points-circle', 'visibility', visibility);
});

// Click event for borough boundaries
map.on('click', 'borough-boundaries-fill', (e) => {
    if (e.features.length > 0) {
        const boroughName = e.features[0].properties.BoroName;
    
        map.setFilter('borough-boundaries-line-highlight', ['==', 'BoroName', boroughName]);
    }
});

// add a click listener for the study area polygons
map.on('click', 'pluto-study-area-fill', (e) => {
    if (e.features.length > 0) {
        const address = e.features[0].properties.Address;
        const landUse = e.features[0].properties.LandUse;
        const unitsRes = e.features[0].properties.UnitsRes;

        // Populate and show the info panel
        document.getElementById('info-title').textContent = address;
        document.getElementById('info-landuse').textContent = LandUseLookup(landUse).description;
        document.getElementById('info-unitsres').textContent = unitsRes;
        document.getElementById('info-panel').classList.add('visible');
        
        // Highlight the selected polygon
        map.setFilter('pluto-study-area-highlight', ['==', 'Address', address]);
    }
});

// Close button for info panel
document.getElementById('close-panel').addEventListener('click', () => {
    document.getElementById('info-panel').classList.remove('visible');
    // Clear the highlight when closing the panel
    map.setFilter('pluto-study-area-highlight', ['==', 'Address', '']);
});