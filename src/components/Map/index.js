import React, { useEffect } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import "./style.css";
import { Map as LeafletMap, TileLayer, Popup, Circle, Marker } from 'react-leaflet';
import L from 'leaflet';
import iconHere from './../../assets/image/you-are-here.svg'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as countryActions from './../../actions/country';

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 800,
    },
    recovered: {
        hex: "#7DD71D",
        multiplier: 1200,
    },
    deaths: {
        hex: "#FB4443",
        multiplier: 2000,
    }
}

const myIcon = L.icon({
    iconUrl: iconHere,
    iconSize: [38, 95], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [20, 70], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [-3, -76]
})

function Map(props) {
    const { countries, countrySelecting, countryActionCreators, casesType, data } = props;
    useEffect(() => {
        const { fetchListCountryRequest } = countryActionCreators;
        fetchListCountryRequest();
    }, [countryActionCreators])

    const renderCircleOnMap = (data, casesType = "cases") => {
        let xhtml = null;
        xhtml = data.map((country, index) => {
            return (
                < Circle
                    key={index}
                    center={[country.lat, country.long]}
                    fillOpacity={0.4}
                    color={casesTypeColors[casesType].hex}
                    fillColor={casesTypeColors[casesType].hex}
                    radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
                >
                    <Popup >
                        <div className="flag" style={{ backgroundImage: `url(${country.flag})` }}></div>
                        <div className="name" >{country.name}</div>
                        <div className="cases" >Cases: {country.cases}</div>
                        <div className="recovered" >Recovered: {country.recovered}</div>
                        <div className="deaths" >Deaths: {country.deaths}</div>
                    </Popup>
                </Circle>
            )
        })
        return xhtml;
    }


    const setCenterAndZoom = ((countrySelecting, data) => {
        let newData = {
            coordinate: [10, 10],
            zoom: 1,
            flag: '',
        }

        if (countrySelecting !== 'worldwide') {
            if (data.countryInfo !== undefined) {
                newData = {
                    coordinate: [data.countryInfo.lat, data.countryInfo.long],
                    zoom: 5,
                    flag: data.countryInfo.flag,
                };
            }
        }
        else {
            newData = {
                coordinate: [10, 10],
                zoom: 1,
            }
        }
        return newData;
    })

    const coordinate = setCenterAndZoom(countrySelecting, data);

    return (
        <div className="map">
            <LeafletMap center={coordinate.coordinate} zoom={coordinate.zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                >
                </TileLayer>
                {renderCircleOnMap(countries, casesType)}
                {countrySelecting !== 'worldwide' &&
                    <Marker position={coordinate.coordinate} icon={myIcon} >
                        <Popup >
                            <div className="flag" style={{ backgroundImage: `url(${coordinate.flag})` }}></div>
                            <div className="name" >{data.country}</div>
                            <div className="cases" >Cases: {data.cases}</div>
                            <div className="recovered" >Recovered: {data.recovered}</div>
                            <div className="deaths" >Deaths: {data.deaths}</div>
                        </Popup>
                    </Marker>}
            </LeafletMap>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        countries: state.countryReducer.listCountry || null,
        countrySelecting: state.countryReducer.countrySelecting || null,
        data: state.countryReducer.data || null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        countryActionCreators: bindActionCreators(countryActions, dispatch),
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Map));
