import React from 'react'
import ReactHighcharts from 'react-highcharts'

class Total extends React.Component {
  createChart() {
    if(this.props.totalStatus.new.ho) {
      return <ReactHighcharts config={this.columnChart()} />
    }
    else {
      return <h3 className='loading'>Loading ...</h3>
    }
  }

  render() {
    return (
      <div className='col-4 ticket-status'>
        <div className='chart'>
          {this.createChart()}
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
          data: [this.props.totalStatus.new.tmc, this.props.status.new.ho]
          ,
        },
        {
          name: 'Solved Tickets',
          color: '#0b9444',
          data: [this.props.totalStatus.solved.tmc, this.props.status.solved.ho]
        }
      ]
    }
  }
}

module.exports = Total
