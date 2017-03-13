import _ from 'lodash'
import React from 'react'
import ReactHighcharts from 'react-highcharts'
import moment from 'moment'

class Daily extends React.Component {
  createChart() {
    if(this.props.dailyStatus.new.ho) {
      return <ReactHighcharts config={this.mixChart()} />
    }
    else {
      return <h3 className='loading'>Loading ...</h3>
    }
  }

  render() {
    return (
      <div className='col-8 ticket-status'>
        <div className='chart'>
          {this.createChart()}
        </div>
      </div>
    )
  }

  mixChart() {
    console.log(this.getDateKeys());
    return {
      title: {
        text: 'Daily Status'
      },

			xAxis: {
				categories: this.getDateKeys(),
        crosshair: true
			},

      yAxis: {
        min: 0,
        title: null
      },

			credits: {
				enabled: false
			},

			series: [
        {
          name: 'New Tickets(HO)',
          type: 'spline',
          color: '#030162',
          data: _.values(this.props.dailyStatus.new.ho),
          dataLabels: {
            enabled: true,
            crop: false,
            overflow: 'none'
          }

        },
        {
          name: 'New Tickets(TMC)',
          type: 'spline',
          color: '#0b9444',
          data: _.values(this.props.dailyStatus.new.tmc),
          dataLabels: {
            enabled: true,
            crop: false,
            overflow: 'none'
          }
        },
        {
          name: 'Solved Tickets(HO)',
          type: 'column',
          color: '#6facd8',
          data: _.values(this.props.dailyStatus.solved.ho),
          dataLabels: {
            enabled: true,
            inside: true
          }
        },
        {
          name: 'Solved Tickets(TMC)',
          type: 'column',
          color: '#b5dfc7',
          data: _.values(this.props.dailyStatus.solved.tmc),
          dataLabels: {
            enabled: true,
            inside: true
          }
        }
      ]
    }
  }

  getDateKeys() {
    var keys = []
    _.keys(this.props.dailyStatus.new.tmc)

    return keys;
  }
}

module.exports = Daily
