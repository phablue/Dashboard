import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'

import routes from './config/routes'
import './assets/styles/index.scss'
import './assets/images/logo.png'

render(
   <Router history={ browserHistory }>{ routes }</Router>,
   document.getElementById('app')
)
