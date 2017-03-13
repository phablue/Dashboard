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
					{ name: 'Offered', y: this.props.satisfactionHO.offered, color: '#8096a6' },
					{ name: 'Good', y: this.props.satisfactionHO.good, color: '#028abe' },
					{ name: 'Bad', y: this.props.satisfactionHO.bad, color: '#ce0000' }
				]
			}]
    }
  }
}

module.exports = Ho
