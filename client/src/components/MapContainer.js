import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { googleAPIKey } from '../../../config/google';


class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            marker: {
                name: '',
                position: {
                    lat: 0,
                    lng: 0
                }
            }
        };

        this.retrieveBuildingLocation = this.retrieveBuildingLocation.bind(this);
        this.createMarker = this.createMarker.bind(this);
    }

    retrieveBuildingLocation(mapProps, map) {
        var service = new mapProps.google.maps.places.PlacesService(map);

        const request = {
            query: 'montreal roccabella 1300',
            fields: [ 'name', 'formatted_address', 'icon', 'geometry' ]
        }

        service.findPlaceFromQuery(request, this.createMarker);
    }

    createMarker(places, status) {
        if(status === this.props.google.maps.places.PlacesServiceStatus.OK){
            this.setState({
                marker: {
                    name: places[0].name,
                    position: {
                        lat: places[0].geometry.location.lat(),
                        lng: places[0].geometry.location.lng(),
                    }
                }
            })
        }
    }
    
    render() {
        return(
            <div>
                <div style={{ textAlign: 'center' }}>
                    <h1>
                        Building Portal
                    </h1>
                </div>
                <Map
                google={this.props.google}
                zoom={15}
                style={{ width: '50%', height: '50%' }}
                initialCenter={{ lat: 45.496967, lng: -73.571490 }}
                onReady={this.retrieveBuildingLocation}
                >
                    <Marker
                        position={this.state.marker.position}
                        name={this.state.marker.name}
                    />
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: googleAPIKey
})(MapContainer);