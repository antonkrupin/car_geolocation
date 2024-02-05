import React from 'react';
import { YMaps, Map, Placemark, Circle, ZoomControl } from '@pbe/react-yandex-maps';

import { TEST_KPP_COORDS } from '../../assets/TEST_CONST';


const CityMap = (props) => {
	const { carCoords } = props;
  //const coords = useSelector(fetchCoords);
  return (
    <YMaps>
      <div>
        <Map
          defaultState={{ center: TEST_KPP_COORDS, zoom: 12 }}
          width="100%"
          height="55vh"
        >
          <Placemark
            //modules={["geoObject.addon.balloon"]}
            geometry={TEST_KPP_COORDS}
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
						geometry={carCoords}
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
            geometry={[TEST_KPP_COORDS, 2000]}
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

/*
{coords && (
	<Placemark
	modules={["geoObject.addon.balloon"]}
	geometry={[coords[0], coords[1]]}
	properties={{
		balloonContentBody:
			[i18next.t('header.clubs.drevlyanka.location'),i18next.t('header.clubs.drevlyanka.address')].join(',')
	}}
	options={{
		//iconLayout: "default#image",
		preset: "islands#blueAutoIcon"
		//iconImageSize: [70, 70],
		//iconImageHref: 'images/map_pointer_icon_1.png',
	}}
/>
)}
*/