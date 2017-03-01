import React from 'react'
import moment from 'moment'

class CurrentDateTime extends React.Component {
  render() {
    return (
      <div className='columns col-4 curreent-date-time'>
        <div className='group'>
          <h3 className='time'>{ moment().format('HH : mm') }</h3>
          <h4 className='date'>{ moment().format('MMM DD ddd') }</h4>
        </div>
      </div>
    )
  }
}

module.exports = CurrentDateTime;
