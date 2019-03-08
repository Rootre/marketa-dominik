import React from 'react';
import classNames from 'classnames';
import GoogleMapReact from 'google-map-react';

import Marker from 'Components/Marker';

import styles from './styles.scss';

const API_KEY = 'AIzaSyBn1lBhNQyL7cFwsFQg9-3CJVzb4TKUa8Y';

function GoogleMap({center, className, text, zoom = 14, ...rest}) {
    return (
        <div className={classNames(className, styles.wrapper)}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: API_KEY}}
                defaultCenter={center}
                defaultZoom={zoom}
                {...rest}
            >
                <Marker
                    lat={center.lat}
                    lng={center.lng}
                    text={text}
                />
            </GoogleMapReact>
        </div>
    )
}

export default GoogleMap;