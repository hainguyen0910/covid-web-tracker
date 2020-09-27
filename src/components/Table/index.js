import React, { useEffect } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as countryActions from './../../actions/country';
import { sortData } from './../../utils';
import './style.css';

function Table(props) {
    const { top15CountriesData, countryActionCreators } = props;

    const { getTop15CountriesRequest } = countryActionCreators;
    useEffect(() => {
        getTop15CountriesRequest()
    }, [countryActionCreators, getTop15CountriesRequest])



    const renderTable = top10CountriesData => {
        let xhtml = null;
        if (top10CountriesData === [])
            return;
        const sortedData = sortData(top10CountriesData)

        const filteredData = sortedData.filter(item => {
            return item.todayCases > 0;
        })

        if (filteredData === [])
            return xhtml;
        else {
            xhtml = filteredData.slice(0,15).map((item) => (
                <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>
                        <strong>{item.todayCases}</strong>
                    </td>
                </tr>
            ))
        }
        return xhtml;
    }

    return (
        <div className="table">
            <table>
                <tbody>
                    {renderTable(top15CountriesData)}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        top15CountriesData: state.countryReducer.countriesData || [],
    }
}

const mapDispatchToProps = dispatch => {
    return {
        countryActionCreators: bindActionCreators(countryActions, dispatch)
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Table));
