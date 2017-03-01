import React from 'react'
import Total from './Total'
import Daily from './Daily'

class Index extends React.Component {
  render() {
    return (
      <div className='columns col-7 ticket-status'>
				<div className='group'>
					<h2 className='sub-title'>Tickets Staus Last 7 days</h2>
					<Total />
					<Daily />
				</div>
      </div>
    )
  }
}

module.exports = Index
