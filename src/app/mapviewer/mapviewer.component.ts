import { Component, OnInit } from '@angular/core';
import { Feature, Tile } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import TileWMS from 'ol/source/TileWMS'
import LayerGroup from 'ol/layer/Group';
import XYZ from 'ol/source/XYZ';
import LayerSwitcher from 'ol-layerswitcher';
import SourceStamen from 'ol/source/Stamen';
import { BaseLayerOptions, GroupLayerOptions } from 'ol-layerswitcher';
import ImageLayer from 'ol/layer/Image';
import WKT from 'ol/format/WKT';
import * as olExtent from 'ol/extent';
import { Coordinate } from 'ol/coordinate';
import { Geometry, LineString } from 'ol/geom';
import { Parcel, ParcelService } from '../parcel.service';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mapviewer',
  templateUrl: './mapviewer.component.html',
  styleUrls: ['./mapviewer.component.css']
})
export class MapviewerComponent implements OnInit {

  features: Feature<Geometry>[]=[];
  map: Map | undefined;
  
  styleFunction =  (feature: Feature<Geometry>) => {
    
    //const tttt= feature?.getGeometry()?.getType();
    return new Style({
      stroke: new Stroke({
        color: 'red',
        //lineDash: [4],
        width: 2,
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0.1)',
      }),
    });
  };

  styleBuildFunction =  (feature: Feature<Geometry>) => {
    
    //const tttt= feature?.getGeometry()?.getType();
    return new Style({
      stroke: new Stroke({
        color: 'green',
        //lineDash: [4],
        width: 2,
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0.1)',
      }),
    });
  };

  styles = {
    'LineString': new Style({
      stroke: new Stroke({
        color: 'green',
        width: 1,
      }),
    }),
    'MultiLineString': new Style({
      stroke: new Stroke({
        color: 'green',
        width: 1,
      }),
    }),
    'MultiPolygon': new Style({
      stroke: new Stroke({
        color: 'yellow',
        width: 1,
      }),
      fill: new Fill({
        color: 'rgba(255, 255, 0, 0.1)',
      }),
    }),
    'Polygon': new Style({
      stroke: new Stroke({
        color: 'blue',
        lineDash: [4],
        width: 3,
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0.1)',
      }),
    }),
    'GeometryCollection': new Style({
      stroke: new Stroke({
        color: 'magenta',
        width: 2,
      }),
      fill: new Fill({
        color: 'magenta',
      }),
      image: new CircleStyle({
        radius: 10,
        stroke: new Stroke({
          color: 'magenta',
        }),
      }),
    }),
    'Circle': new Style({
      stroke: new Stroke({
        color: 'red',
        width: 2,
      }),
      fill: new Fill({
        color: 'rgba(255,0,0,0.2)',
      }),
    }),
  };

  constructor(private parcelService: ParcelService, private router: Router) {
    
  }

  AddGrouplayer() {
    const osm = new TileLayer({
      title: 'OSM',
      type: 'base',
      visible: true,
      source: new OSM()
    } as BaseLayerOptions);
    
    const googlesat = new TileLayer({
      title: 'Google Satellite',
      type: 'base',
      visible: false,
      source: new XYZ({
        url: 'http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}'
      })
    } as BaseLayerOptions);

    const wmslayer = new TileLayer({
      title: 'WMS',
      type: 'base',
      visible: false,
      source: new TileWMS({
        url: 'http://dwjhbgissvr:8085/geoserver/wms?',
        params: {'LAYERS': 'Img_Group', 'TILED': true, 'FORMAT': 'image/png', 'TRANSPARENT': true},
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
      }),
    } as BaseLayerOptions);
    
    const baseMaps = new LayerGroup({
      title: 'Base Layer',
      layers: [googlesat, osm, wmslayer]
    } as GroupLayerOptions);
    
    //const xy = [2672038.18415, -3587680.74832];
    //const coor = fromLonLat(xy);
    
    this.AddVectorLayer();

    this.map = new Map({
      target: 'map',
      layers: [baseMaps],
      // view: new View({
      //   center: [2672038.18415 , -3587680.74832],
      //   zoom: 4
      // })
    });
    

    const layerSwitcher = new LayerSwitcher({
      reverse: false,
      groupSelectStyle: 'group'
    });

    this.map.addControl(layerSwitcher);
      
  }

  AddVectorLayer() {  

    this.parcelService.getParcels()
      .subscribe(
        wktparcels => {
          this.GetParcelWkts(wktparcels);
        
        },
        error => alert(error) // error path
        );
        
    //return  { center: center, vlayer: overlayMaps };
  }

  GetParcelWkts(wktparcels: Parcel[]) {

    //let buildAA: string[] = [];
    let buildfeatures: Feature<Geometry>[]=[];

    wktparcels.forEach( (parcel) => {
      this.features.push(new WKT().readFeature(parcel.wkt, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857',
      }));

      if(parcel.data != '') {
        let jParcel = JSON.parse(parcel.data);
        jParcel.Buildings.forEach( (built: any) => {
          buildfeatures.push(new WKT().readFeature(built.WKT, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857',
          }));
        });
     }
  });

  const vector = new VectorLayer({
    title: 'Parcel',
    source: new VectorSource({
      features: this.features,
    }),
    style: this.styleFunction,
  } as BaseLayerOptions);

  const vectorBuilding = new VectorLayer({
    title: 'Building',
    source: new VectorSource({
      features: buildfeatures,
    }),
    style: this.styleBuildFunction,
  } as BaseLayerOptions);


  const overlayMaps = new LayerGroup({
    title: 'Overlays',
    layers: [vector,vectorBuilding]
  } as GroupLayerOptions);
  
  this.map?.addLayer(overlayMaps);
  
  
  this.map?.on('click', e => {
    this.map?.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
      //console.log();
    }
    )
  })

  this.map?.on('pointermove', e => {
    const pixel = this.map?.getEventPixel(e.originalEvent);
    const hit = this.map?.hasFeatureAtPixel(pixel!);
    let tt = this.map?.getViewport().style.cursor;
    tt = hit ? 'pointer' : '';
  });


  this.map?.getView().fit(vector?.getSource()?.getExtent()!);
}



SetStyle() {
  
  return new Style({
    stroke: new Stroke({
      color: 'blue',
      lineDash: [4],
      width: 3,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
  });

  //return this.styles[feature?.getGeometry()?.getType()];
}

  ngOnInit() {

    this.AddGrouplayer();

  }

}
