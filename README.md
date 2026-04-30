# LIHTC Mapping in CD 304 Webmap
## For URPL-GP 4650

This interactive webmap project features LIHTC development and city-owned vacant properties in CD 304 (Bushwick). 

You can see it live [here]().

### Data

The project relies on data from a few key sources:
- [DCP's 'City Owned and Leased Property (COLP)'](https://data.cityofnewyork.us/City-Government/City-Owned-and-Leased-Property-COLP-/fn4k-qyk2/about_data) dataset
- [HUD's Property Level LIHTC Data](https://www.huduser.gov/portal/datasets/lihtc/property.html) on LIHTC projects
- [DCP's Primary Land Use Tax Lot Output (PLUTO)](https://data.cityofnewyork.us/City-Government/Primary-Land-Use-Tax-Lot-Output-PLUTO-/64uk-42ks/about_data) dataset

Some light cleaning was done in a separate .rmd file to filter and join the LIHTC and PLUTO datasets in order to pull BBL information for the former. All three were edited briefly in QGIS to transform their data structure from .csv to .geojson.

### Features

This project includes:
- An interactive map which allows users to zoom and move the interface around
- Clickable points which provide users with greater details in the info panel

### Files

- `index.html` structures the project
- `scripts.js` adds the map and interactive features
- `styles.css` sets formatting parameters
- `/data`
  - `cd304_lihtc_clip.geojson` includes LIHTC project information
  - `cd304_vacant_colp_clip.geojson` includes city owned vacancy information
  - `cd_boundaries.geojson` provides a boundary line for CD 304
  - `cd304_lihtc_mapping.qgz` used to transform the above data into .geojson format
  - `/raw_nyc_open_data_pull` includes pre-HTML data cleaning and raw data pull files

### Technologies Used

- [Mapbox GL JS v3.20.0](https://docs.mapbox.com/mapbox-gl-js/guides/)
- HTML5
- CSS3
- Vanilla JavaScript
- QGIS
- R 4.1.3
name of the project and information about the content and technical details of the project. Why does it exist, what data did you use, what tools/technology are you using, etc?
