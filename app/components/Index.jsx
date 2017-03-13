import 'whatwg-fetch'
import React from 'react'

import InitializeState from './InitializeState'
import Title from './Title'
import CurrentDateTime from './CurrentDateTime'
import TicketsStatus from './ticketsStatus/Index'
import Satisfaction from './satisfaction/Index'
import FirstReplyTime from './FirstReplyTime'
import Comments from './Comments'
import WeekendHolidayCover from './WeekendHolidayCover'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = InitializeState
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    fetch('/zd_data')
      .then((response) => {
        return response.json()
      })
      .then((jsonData) => {
        this.setState(jsonData)
      })
      .catch((err) => {
        console.log('parsing failed', err)
      })
  }

  render() {
    return (
      <section className='main-contaniner'>
        <div className='row row-1'>
          <Title />
          <CurrentDateTime />
          <WeekendHolidayCover />
        </div>
        <div className='row row-3'>
          <TicketsStatus statusTotal={this.state.status_total} statusDaily={this.state.status_daily} />
          <FirstReplyTime firstReplyTime={this.state.first_reply_status} />
        </div>
        <div className='row row-2'>
          <Satisfaction satisfactionTotal={this.state.satisfaction_total} />
          <Comments comments={this.state.comments} />
        </div>
      </section>
    )
  }
}

module.exports = Index;
