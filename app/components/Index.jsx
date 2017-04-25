import 'whatwg-fetch'
import React from 'react'

import InitializeState from './InitializeState'
import Title from './Title'
import CurrentDateTime from './CurrentDateTime'
import TicketsStatus from './ticketsStatus/Index'
import Satisfaction from './satisfaction/Index'
import FirstReplyTime from './firstReplyTime/Index'
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

  handleErrors(response) {
    if (!response.ok) {
      throw Error(response.status);
    }
    return response.json();
  }

  getData() {
    fetch('/zd_data')
      .then(this.handleErrors)
      .then((jsonData) => {
        this.setState(jsonData)
				this.setState({ currentStep: 1 })
        this.displayPage()
      })
      .catch((err) => {
        console.log(err)
        if(err.message == 500) {
          this.getData()
        }
      })
  }

	displayPage() {
    setInterval(this.changeCurrentStep.bind(this), 15000);
	}

	changeCurrentStep() {
		if (this.state.currentStep < 4 ) {
			var nextStep = this.state.currentStep + 1
			this.setState({ currentStep: nextStep })
		}
		else {
			this.setState({ currentStep: 1 })
		}
	}

	showPage() {
		switch (this.state.currentStep) {
			case 1:
				return this.showAll()
				break
			case 2:
				return this.showStatus()
				break
			case 3:
				return this.showReplyAndSatisFaction()
				break
			case 4:
				return this.showComments()
				break
			case 0:
				return this.showLoader()
		}
	}

	showLoader() {
		return (
			<div id="loader" ref='pageLoader'></div>
			//<div id="loader-header" ref="pageLoaderheader"> Loading </div>
		)
	}

	showAll() {
    return (
      <section className='main-contaniner'>
        <div className='row'>
          <TicketsStatus statusTotal={this.state.status_total} statusDaily={this.state.status_daily} />
        </div>

        <div className='row'>
          <FirstReplyTime allFirstReplyTime={this.state.first_reply_status} />
          <Satisfaction totalSatisfaction={this.state.satisfaction_total} />
        </div>

        <div className='row'>
          <Comments comments={this.state.comments} />
        </div>
      </section>
    )
	}

	showStatus() {
    return (
      <section className='main-contaniner'>
        <div className='row only'>
          <TicketsStatus statusTotal={this.state.status_total} statusDaily={this.state.status_daily} />
        </div>
      </section>
    )
	}

	showReplyAndSatisFaction() {
    return (
      <section className='main-contaniner'>
        <div className='row only'>
          <FirstReplyTime allFirstReplyTime={this.state.first_reply_status} />
          <Satisfaction totalSatisfaction={this.state.satisfaction_total} />
        </div>
      </section>
    )
	}

	showComments() {
    return (
      <section className='main-contaniner'>
        <div className='row only'>
          <Comments comments={this.state.comments} />
        </div>
      </section>
    )
	}

  render() {
		return this.showPage()
  }
}

module.exports = Index;
