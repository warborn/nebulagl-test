import React, { useState } from "react";
import { MapboxLayer } from "@deck.gl/mapbox";
import { EditableGeoJsonLayer, DrawPolygonMode } from "nebula.gl";
import MapGL, { CustomLayer } from "@urbica/react-map-gl";
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

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiYWxlcGhyaSIsImEiOiJjamdwbHpycjIyZm45Mndud3AzamRibHpqIn0.ejAHwSGT6dcGxiDOrPCFLg";

function App() {
  const [data, setData] = useState(myFeatureCollection);
  const [viewport, setViewport] = useState(initialViewport);

  const layer = new MapboxLayer({
    id: "geojson-layer",
    type: EditableGeoJsonLayer,
    data,
    mode: DrawPolygonMode,
    selectedFeatureIndexes,
    onEdit: ({ updatedData }) => {
      setData(updatedData);
    }
  });

  return (
    <div className="App">
      <MapGL
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        accessToken={MAPBOX_ACCESS_TOKEN}
        latitude={viewport.latitude}
        longitude={viewport.longitude}
        zoom={viewport.zoom}
        onViewportChange={viewport => setViewport(viewport)}
      >
        <CustomLayer layer={layer} />
      </MapGL>
    </div>
  );
}

export default App;
