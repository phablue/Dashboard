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
          dataLabels: {
            enabled: true,
            inside: true,
            style: {
              fontSize: '1.1rem'
            }
          }
        }
      },

			credits: {
				enabled: false
			},

			series: [
        {
          name: 'New',
          color: '#52b8de',
          data: [this.props.totalStatus.new.tmc, this.props.totalStatus.new.ho]
          ,
        },
        {
          name: 'Solved',
          color: '#8dbd50',
          data: [this.props.totalStatus.solved.tmc, this.props.totalStatus.solved.ho]
        }
      ]
    }
  }
}

module.exports = Total
