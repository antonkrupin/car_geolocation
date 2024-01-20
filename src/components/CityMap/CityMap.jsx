import React from 'react';
import { useSelector } from 'react-redux';
import { YMaps, Map, Placemark, Circle, ZoomControl } from '@pbe/react-yandex-maps';

import { fetchCoords } from '../../slices/selectors';


const CityMap = () => {
  const coords = useSelector(fetchCoords);
  return (
    <YMaps>
      <div>
        <Map
          defaultState={{ center: [61.889592, 34.244612], zoom: 12 }}
          width="100%"
          height="55vh"
        >
          <Placemark
            //modules={["geoObject.addon.balloon"]}
            geometry={[61.889592, 34.244612]}
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
            geometry={[coords[0], coords[1]]}
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
            geometry={[[61.889592, 34.244612], 5000]}
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
//61.889592, 34.244612 шуя
//59.122675, 37.903452 череповец