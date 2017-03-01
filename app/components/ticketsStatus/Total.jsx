import React from 'react'
import ReactHighcharts from 'react-highcharts'

class Total extends React.Component {
  render() {
    return (
      <div className='col-4 ticket-status'>
        <div className='chart'>
          <ReactHighcharts config={this.columnChart()} />
        </div>
      </div>
    )
  }

  columnChart() {
    return {
      chart: {
        type: 'column'
      },

      title: {
        text: 'Total Status'
      },

			xAxis: {
				categories: ['TMC', 'HO'],
        crosshair: true
			},

			yAxis: {
        min: 0,
        title: {
          text: null
        }
			},

      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            inside: true
          }
        }
      },

			credits: {
				enabled: false
			},

			series: [
        {
          name: 'New Tickets',
          color: '#f37a21',
          data: [3, 17.2]
          ,
        },
        {
          name: 'Solved Tickets',
          color: '#0b9444',
          data: [10, 34.4]
        }
      ]
    }
  }
}

module.exports = Total
