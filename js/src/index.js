import 'babel-polyfill'
import './style/index.global.sass'
import 'src/d3/config'
import 'semantic-ui-css/semantic.min.css'
import ReactDOM from 'react-dom'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from 'src/components/App'

const rootEl = window.document.getElementById('root')

const w = new Worker('worker.js')

w.onmessage = function (e) {
    result.textContent = e.data
    console.log('Message received from worker')
}

w.postMessage([5, 7])

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>, rootEl)


