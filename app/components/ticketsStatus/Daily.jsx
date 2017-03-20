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
      <div className='col-9 ticket-status'>
        <div className='chart'>
          {this.createChart()}
        </div>
      </div>
    )
  }

  mixChart() {
    return {
      chart: {
        type: 'column'
      },

      title: {
        text: 'Daily Status'
      },

			xAxis: {
				categories: this.getDateKeys()
			},

      yAxis: {
        min: 0,
        title: null
      },

			legend: {
				align: 'center',
				verticalAlign: 'top',
				floating: true,
				backgroundColor: 'white',
				y: 20,
				shadow: false,
				itemStyle: { "fontSize": "1.3rem", "fontWeight": "bold" }
			},

			plotOptions: {
				column: {
					grouping: false,
					shadow: false,
					borderWidth: 0
				}
			},

			credits: {
				enabled: false
			},

			series: [
        {
          name: 'HO New',
          color: '#429a86',
          data: _.values(this.props.dailyStatus.new.ho),
					pointPadding: 0.3,
					pointPlacement: -0.2
        },
        {
          name: 'HO Solved',
          color: '#d3ffba',
          data: _.values(this.props.dailyStatus.solved.ho),
					pointPadding: 0.4,
					pointPlacement: -0.2
        },
        {
          name: 'TMC New',
          color: '#3c5b88',
          data: _.values(this.props.dailyStatus.new.tmc),
					pointPadding: 0.3,
					pointPlacement: 0.2
        },
        {
          name: 'TMC Solved',
          color: '#cceae8',
          data: _.values(this.props.dailyStatus.solved.tmc),
					pointPadding: 0.4,
					pointPlacement: 0.2
        }
      ]
    }
  }

  getDateKeys() {
    var keys = []
    _.forEach(this.props.dailyStatus.new.tmc, (value, key) => {
      keys.push(moment(key).format('MMM-DD'))
    })

    return keys;
  }
}

module.exports = Daily
