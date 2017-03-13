import React from 'react'
import ReactHighcharts from 'react-highcharts'

class FirstReplyTime extends React.Component {
  createChart() {
    if(this.props.firstReplyTime.ho['0-1']) {
      return <ReactHighcharts config={this.columnChart()} />
    }
    else {
      return <h3 className='loading'>Loading ...</h3>
    }
  }

  render() {
    return (
      <div className='columns col-5 first-reply-time'>
        <div className='group'>
          <h2 className='sub-title'>First Reply Time</h2>
          <div className='chart'>
            {this.createChart()}
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
          data: [
            this.props.firstReplyTime.tmc['0-1'],
            this.props.firstReplyTime.ho['0-1']
          ],
        },
        {
          name: '1-8 hrs',
          data: [
            this.props.firstReplyTime.tmc['1-8'],
            this.props.firstReplyTime.ho['1-8']
          ],
        },
        {
          name: '8-24 hrs',
          data: [
            this.props.firstReplyTime.tmc['8-24'],
            this.props.firstReplyTime.ho['8-24']
          ],
        },
        {
          name: 'Over 24 hrs',
          data: [
            this.props.firstReplyTime.tmc['24+'],
            this.props.firstReplyTime.ho['24+']
          ],
        }
      ]
    }
  }
}

module.exports = FirstReplyTime
