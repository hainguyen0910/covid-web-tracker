import React, { useEffect } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles'
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as historicalActions from './../../../actions/historical'
import numeral from 'numeral';


const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            }
        }
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    parser: "MM/DD/YY",
                    tooltipFormat: "ll",
                }
            }
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    }
                }
            }
        ]
    }
}

function LineGraph(props) {
    const { chartData, historical, historicalActionCreators } = props;
    useEffect(() => {
        const { fetchHistoricalDataRequest } = historicalActionCreators;
        fetchHistoricalDataRequest();
    }, [historicalActionCreators])

    useEffect(() => {
        const { setChartData } = historicalActionCreators;
        setChartData(buildChartData(historical, "cases"));
    }, [historicalActionCreators, historical])

    const buildChartData = (data, casesType = "cases") => {
        const chartData = [];
        let lastDataPoint;
        if (data[casesType]) {
            for (var [key, value] of Object.entries(data[casesType])) {
                if (lastDataPoint) {
                    const newDataPoint = {
                        x: key,
                        y: value - lastDataPoint,
                    }
                    chartData.push(newDataPoint);
                }
                lastDataPoint = data[casesType][key];
            }
            return chartData;
        }
    }


    return (
        <div>
            <Line
                options={options}
                data={{
                    datasets: [
                        {
                            backgroundColor: "rgba(204,16,51, 0.5",
                            borderColor: "#CC1034",
                            data: chartData
                        }
                    ],
                }}
            />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        historical: state.historicalReducer.historical,
        chartData: state.historicalReducer.chartData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        historicalActionCreators: bindActionCreators(historicalActions, dispatch)
    }
}


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LineGraph));
