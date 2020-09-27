import React, { useEffect } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles'
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as countryActions from './../../actions/country';

function Header(props) {
    const { classes, countryActionCreators, listCountry, countrySelecting } = props;
    const renderListCountry = (countries) => {
        let xhtml = null;
        xhtml = countries.map((country, index) => (
            <MenuItem value={country.countryCode} key={index} >{country.name}</MenuItem>
        ))
        return xhtml;
    }

    useEffect(() => {
        const { fetchListCountryRequest } = countryActionCreators;
        fetchListCountryRequest();
    }, [countryActionCreators]);

    const onCountryChange = (event) => {
        const countryCode = event.target.value;
        const { setCountrySelecting } = countryActionCreators;
        setCountrySelecting(countryCode);
    }

    return (
        <div>
            <div className={classes.appHeader}>
                <h1>COVID-19 TRACKER</h1>
                <FormControl className={classes.appDropDown}>
                    <Select
                        variant="outlined"
                        value={countrySelecting}
                        onChange={onCountryChange}>
                        <MenuItem value="worldwide" >Worldwide</MenuItem>
                        {renderListCountry(listCountry)}
                    </Select>
                </FormControl>
            </div>
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        listCountry: state.countryReducer.listCountry,
        countrySelecting: state.countryReducer.countrySelecting,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        countryActionCreators: bindActionCreators(countryActions, dispatch),
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Header));
