import React from 'react'
import ReactHighcharts from 'react-highcharts'
import moment from 'moment'

class Daily extends React.Component {
  render() {
    return (
      <div className='col-8 ticket-status'>
        <div className='chart'>
          <ReactHighcharts config={this.mixChart()} />
        </div>
      </div>
    )
  }

  mixChart() {
    return {
      title: {
        text: 'Daily Status'
      },

			xAxis: {
				categories: this.getLast7Days(),
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
          data: [10, 0, 30, 12, 23, 4, 22],
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
          data: [20, 18, 3, 2, 3, 24, 12],
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
          data: [1, 5, 8, 2, 8, 13, 23],
          dataLabels: {
            enabled: true,
            inside: true
          }
        },
        {
          name: 'Solved Tickets(TMC)',
          type: 'column',
          color: '#b5dfc7',
          data: [7, 18, 1, 6, 10, 4, 9],
          dataLabels: {
            enabled: true,
            inside: true
          }
        }
      ]
    }
  }

  getLast7Days() {
    var last7Days = []

    for(var i = 1; i <= 7; i++) {
      last7Days.push(moment().subtract(i, 'days').format("MMM-DD"));
    }

    return last7Days;
  }
}

module.exports = Daily
