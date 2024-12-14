import {useEffect, useRef} from "react";
import "ol/ol.css";
import {Map, View} from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import {fromLonLat} from "ol/proj";
import {PROJECTION_TYPE} from "../../types/constants.ts";

interface IGeoJsonMapProps {
    geoJsonData: any;
}

const GeoJsonMap = ({geoJsonData}: IGeoJsonMapProps) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<Map | null>(null);

    useEffect(() => {
        if (!geoJsonData || !mapRef.current) return;

        const vectorSource = new VectorSource({
            features: new GeoJSON().readFeatures(geoJsonData, {
                featureProjection: PROJECTION_TYPE
            }),
        });

        const vectorLayer = new VectorLayer({
            source: vectorSource,
        });

        if (!mapInstance.current) {
            mapInstance.current = new Map({
                target: mapRef.current,
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                    vectorLayer,
                ],
                view: new View({
                    center: fromLonLat([0, 0]),
                    zoom: 2,
                }),
            });
        } else {
            mapInstance.current.getLayers().item(1)?.setSource(vectorSource);
        }

        const mapView = mapInstance.current.getView();
        const extent = vectorSource.getExtent();
        if (extent) {
            mapView.fit(extent, {padding: [20, 20, 20, 20]});
        }

        return () => {
            if (mapInstance.current) {
                mapInstance.current.setTarget(null);
                mapInstance.current = undefined;
            }
        };
    }, [geoJsonData]);

    return <div ref={mapRef} style={{width: "100%", height: "400px"}}/>;
};

export default GeoJsonMap;
