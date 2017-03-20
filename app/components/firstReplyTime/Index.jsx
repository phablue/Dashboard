import React from 'react'
import TMC from './Tmc'
import HO from './Ho'

class Index extends React.Component {
  render() {
    return (
      <div className='columns col-6 first-reply-time'>
        <div className='group'>
          <h2 className='sub-title'>First Reply Time</h2>
          <TMC tmcFirstReplyTime={this.props.allFirstReplyTime.tmc} />
          <HO hoFirstReplyTime={this.props.allFirstReplyTime.ho} />
        </div>
      </div>
    )
  }
}

module.exports = Index
