import React from 'react';
import { YMaps, Map, Placemark, Circle, ZoomControl } from '@pbe/react-yandex-maps';


const CityMap = () => {
  return (
    <YMaps>
      <div>
        <Map
          defaultState={{ center: [59.122675, 37.903452], zoom: 12 }}
          width="100%"
          height="55vh"
        >
          <Placemark
            //modules={["geoObject.addon.balloon"]}
            geometry={[59.122675, 37.903452]}
            /*properties={{
              balloonContentBody:
                [i18next.t('header.clubs.drevlyanka.location'),i18next.t('header.clubs.drevlyanka.address')].join(',')
            }}*/
            options={{
              //iconLayout: "default#image",
              preset: "islands#blueCircleDotIcon"
              //iconImageSize: [70, 70],
              //iconImageHref: 'images/map_pointer_icon_1.png',
            }}
          />
          <Placemark
            modules={["geoObject.addon.balloon"]}
            geometry={[59.132058, 37.860000]}
            /*properties={{
              balloonContentBody:
                [i18next.t('header.clubs.drevlyanka.location'),i18next.t('header.clubs.drevlyanka.address')].join(',')
            }}*/
            options={{
              //iconLayout: "default#image",
              preset: "islands#blueAutoIcon"
              //iconImageSize: [70, 70],
              //iconImageHref: 'images/map_pointer_icon_1.png',
            }}
          />
          <Circle 
            geometry={[[59.122675, 37.903452], 5000]}
            options={{
              draggable: false,
              fillColor: "#DB709377",
              strokeColor: "#990066",
              strokeOpacity: 0.8,
              strokeWidth: 5,
            }}
          />
          <ZoomControl options={{ float: "right" }} />
        </Map>
      </div>
    </YMaps>
  )
};

export default CityMap;
