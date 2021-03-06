import React from 'react'
import Total from './Total'
import Daily from './Daily'

class Index extends React.Component {
  render() {
    return (
      <div className='columns col-12 ticket-status'>
				<div className='group'>
					<h2 className='sub-title'>Ticket Status Last 7 days</h2>
					<Total totalStatus={this.props.statusTotal} />
					<Daily dailyStatus={this.props.statusDaily} />
				</div>
      </div>
    )
  }
}

module.exports = Index
