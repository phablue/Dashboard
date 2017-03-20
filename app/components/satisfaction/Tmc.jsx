import React from 'react'
import ReactHighcharts from 'react-highcharts'
import moment from 'moment'

class Tmc extends React.Component {
  createChart() {
    if(this.props.satisfactionTMC.offered) {
      return <ReactHighcharts config={this.pieChart()} />
    }
    else {
      return <h3 className='loading'>Loading ...</h3>
    }
  }

  render() {
    return (
      <div className='col-6 tmc'>
        <div className='chart'>
          {this.createChart()}
        </div>
      </div>
    )
  }

  pieChart() {
    return {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
      },

      title: {
        text: 'TMC',
        align: 'center',
        verticalAlign: 'middle',
        y: 70
      },

      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            formatter: function() {
              if(this.y > 0) {
                return `${this.key}<br>${this.y}%`
              }
            },
            distance: -30,
            style: {
							color: 'black',
              fontSize: '1.1rem'
            }
          },
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%']
        }
      },

			credits: {
				enabled: false
			},

			series: [{
				type: 'pie',
				name: 'Satisfaction',
				innerSize: '50%',
				data: [
					{ name: 'Offered', y: this.props.satisfactionTMC.offered, color: '#ecae4f' },
					{ name: 'Good', y: this.props.satisfactionTMC.good, color: '#23b66f' },
					{ name: 'Bad', y: this.props.satisfactionTMC.bad, color: '#ef193b' }
				]
			}]
    }
  }
}

module.exports = Tmc
