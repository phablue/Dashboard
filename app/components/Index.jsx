import React from 'react'
import Title from './Title'
import CurrentDateTime from './CurrentDateTime'
import TicketsStatus from './ticketsStatus/Index'
import Satisfaction from './satisfaction/Index'
import FirstReplyTime from './FirstReplyTime'
import Comments from './Comments'
import WeekendHolidayCover from './WeekendHolidayCover'

class Index extends React.Component {
  render() {
    return (
      <section className='main-contaniner'>
        <div className='row row-1'>
          <Title />
          <CurrentDateTime />
          <WeekendHolidayCover />
        </div>
        <div className='row row-3'>
          <TicketsStatus />
          <FirstReplyTime />
        </div>
        <div className='row row-2'>
          <Satisfaction />
          <Comments />
        </div>
      </section>
    )
  }
}

module.exports = Index;
