import React, { useEffect } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography } from '@material-ui/core'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as countryActions from './../../actions/country';

function InfoBox(props) {
    const { classes, statCovid, countrySelecting, countryActionCreators } = props;
    useEffect(() => {
        const { getCountryDataRequest } = countryActionCreators;
        const countryCode = countrySelecting === 'worldwide' ? 'all' : countrySelecting;
        getCountryDataRequest(countryCode);
    }, [countryActionCreators, countrySelecting]);

    const todayCases = statCovid.todayCases || 0;
    const totalCases = statCovid.cases || 0;
    const todayRecovered = statCovid.todayRecovered || 0;
    const totalRecovered = statCovid.recovered || 0;
    const todayDeaths = statCovid.todayDeaths || 0;
    const totalDeaths = statCovid.deaths || 0;

    return (
        <Card className={classes.infoBox} >
            {/* Cases */}
            <CardContent>
                <Typography color="textSecondary" className={classes.infoBoxTitle} >
                    Conronavirus Cases
                </Typography>
                <h2 className={classes.infoBoxCases}>{todayCases}</h2>
                <Typography color="textSecondary" className={classes.infoBoxTotal} >
                    Total {totalCases}
                </Typography>
            </CardContent>

            {/* Recovered */}
            <CardContent>
                <Typography color="textSecondary" className={classes.infoBoxTitle} >
                    Recovered
                </Typography>
                <h2 className={classes.infoBoxRecovered}>{todayRecovered}</h2>
                <Typography color="textSecondary" className={classes.infoBoxTotal} >
                    Total {totalRecovered}
                </Typography>
            </CardContent>

            {/* Deaths */}
            <CardContent>
                <Typography color="textSecondary" className={classes.infoBoxTitle} >
                    Deaths
                </Typography>
                <h2 className={classes.infoBoxDeaths}>{todayDeaths}</h2>
                <Typography color="textSecondary" className={classes.infoBoxTotal} >
                    Total {totalDeaths}
                </Typography>
            </CardContent>
        </Card>
    )
}

const mapStateToProps = state => {
    return {
        countrySelecting: state.countryReducer.countrySelecting,
        statCovid: state.countryReducer.data || {},
    }
}

const mapDispatchToProps = dispatch => {
    return {
        countryActionCreators: bindActionCreators(countryActions, dispatch),
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(InfoBox));
