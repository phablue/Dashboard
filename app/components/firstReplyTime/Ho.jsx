import React from 'react'
import ReactHighcharts from 'react-highcharts'

class Ho extends React.Component {
  createChart() {
    if(this.props.hoFirstReplyTime['0-1']) {
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
          alpha: 30
        },
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false
			},

			title: {
				text: 'HO',
				align: 'center',
				verticalAlign: 'middle',
        style: {
          fontSize: '2rem'
        }
			},

			plotOptions: {
				pie: {
					dataLabels: {
						formatter: function() {
							if(this.y > 0) {
								return `${this.key}<br>${this.y}%`
							}
						},
						style: {
							color: 'black',
							fontSize: '1.1rem'
						}
					},
          innerSize: '50%',
          depth: 50,
				}
			},

			credits: {
				enabled: false
			},

			series: [{
				type: 'pie',
				data: [
					{
						name: 'Over 24 hrs',
						y: this.props.hoFirstReplyTime['24+'],
						color: '#e42b75'
					},
					{
						name: '8-24 hrs',
						y: this.props.hoFirstReplyTime['8-24'],
						color: '#fa5833'
					},
					{
						name: '1-8 hrs',
						y: this.props.hoFirstReplyTime['1-8'],
						color: '#ecae4f'
					},
					{
						name: '0-1 hrs',
						y: this.props.hoFirstReplyTime['0-1'],
						color: '#23B661'
					}
				]
			}]
		}
	}
}

module.exports = Ho
