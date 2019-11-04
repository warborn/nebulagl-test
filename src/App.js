import React, { useState } from "react";
import DeckGL from "deck.gl";
import { EditableGeoJsonLayer, DrawPolygonMode } from "nebula.gl";
import MapGL from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import "./App.css";

const myFeatureCollection = {
  type: "FeatureCollection",
  features: []
};

const selectedFeatureIndexes = [];

const initialViewport = {
  latitude: 37.773,
  longitude: -122.481,
  zoom: 15.5
};

const TOKEN =
  "pk.eyJ1IjoiYWxlcGhyaSIsImEiOiJjamdwbHpycjIyZm45Mndud3AzamRibHpqIn0.ejAHwSGT6dcGxiDOrPCFLg";

const initialViewState = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

function App() {
  const [data, setData] = useState(myFeatureCollection);
  const [viewport, setViewport] = useState(initialViewport);

  const layer = new EditableGeoJsonLayer({
    id: "geojson-layer",
    data,
    mode: DrawPolygonMode,
    selectedFeatureIndexes,
    onEdit: ({ updatedData }) => {
      setData(updatedData);
    }
  });

  return (
    <div className="App">
      <DeckGL
        initialViewState={initialViewState}
        controller={true}
        layers={[layer]}
      >
        <MapGL
          {...viewport}
          width="100%"
          height="100%"
          onViewportChange={viewport => setViewport(viewport)}
          mapboxApiAccessToken={TOKEN}
        />
      </DeckGL>
    </div>
  );
}

export default App;
