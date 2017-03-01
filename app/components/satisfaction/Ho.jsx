import React from 'react'
import ReactHighcharts from 'react-highcharts'

class Ho extends React.Component {
  render() {
    return (
      <div className='col-6 ho'>
        <div className='chart'>
          <ReactHighcharts config={this.pieChart()} />
        </div>
      </div>
    )
  }

  pieChart() {
    return {
      chart: {
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
                  return `${this.key}<br>${this.y}%`
								},
                distance: -50
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
        options3d: {
            enabled: true,
            alpha: 45
        },
				name: 'Satisfaction',
				innerSize: '50%',
				data: [
					{ name: 'Offered', y: 20, color: '#8096a6' },
					{ name: 'Googd', y: 30, color: '#028abe' },
					{ name: 'Bad', y: 50, color: '#ce0000' }
				]
			}]
    }
  }
}

module.exports = Ho
