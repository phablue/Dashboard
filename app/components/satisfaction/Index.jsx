import React from 'react'
import TMC from './Tmc'
import HO from './Ho'

class Index extends React.Component {
  render() {
    return (
      <div className='columns col-6 satisfaction'>
        <div className='group'>
          <h2 className='sub-title'>Satisfaction Last 7 Days</h2>
          <TMC satisfactionTMC={this.props.totalSatisfaction.tmc} />
          <HO satisfactionHO={this.props.totalSatisfaction.ho} />
        </div>
      </div>
    )
  }
}

module.exports = Index
