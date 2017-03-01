import React from 'react'
import ReactHighcharts from 'react-highcharts'

class FirstReplyTime extends React.Component {
  render() {
    return (
      <div className='columns col-5 first-reply-time'>
        <div className='group'>
          <h2 className='sub-title'>First Reply Time</h2>
          <div className='chart'>
            <ReactHighcharts config={this.columnChart()} />
          </div>
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
        text: null
      },

			xAxis: {
				categories: ['TMC', 'HO'],
        crosshair: true
			},

			yAxis: {
        min: 0,
        stackLabels: {
          enabled: true
        },
        title: {
          text: null
        }
			},

      plotOptions: {
        column: {
          stacking: 'normal',
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
          name: '0-1 hrs',
          data: [40, 60],
        },
        {
          name: '1-8 hrs',
          data: [30, 20],
        },
        {
          name: '8-24 hrs',
          data: [15, 10],
        },
        {
          name: 'Over 24 hrs',
          data: [15, 10],
        }
      ]
    }
  }
}

module.exports = FirstReplyTime
