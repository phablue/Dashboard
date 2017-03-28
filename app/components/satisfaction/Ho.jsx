import React from 'react'
import ReactHighcharts from 'react-highcharts'

class Ho extends React.Component {
  createChart() {
    if(this.props.satisfactionHO.offered) {
      return <ReactHighcharts config={this.pieChart()} />
    }
    else {
      return <h3 className='loading'>Loading ...</h3>
    }
  }

  render() {
    return (
      <div className='col-6 ho'>
        <div className='chart'>
          {this.createChart()}
        </div>
      </div>
    )
  }

  pieChart() {
    return {
      chart: {
        options3d: {
          enabled: true,
          alpha: 45
        },
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },

      title: {
        text: 'HO',
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
        depth: 45,
				data: [
					{ name: 'Offered', y: this.props.satisfactionHO.offered, color: '#ecae4f' },
					{ name: 'Good', y: this.props.satisfactionHO.good, color: '#23b66f' },
					{ name: 'Bad', y: this.props.satisfactionHO.bad, color: '#ef193b' }
				]
			}]
    }
  }
}

module.exports = Ho
