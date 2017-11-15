import { render } from 'inferno'
import App from './App.jsx'
import './style/main.sass'

;(function () {
  // use this script to replace @media
  let timeoutHandler = 0
  const rem = () => {
    clearTimeout(timeoutHandler)
    document.documentElement.style.fontSize = window.innerWidth / 20 + 'px'
  }
  window.addEventListener('resize', () => { timeoutHandler = setTimeout(rem, 200) })
  rem()
})()

render(<App />, document.getElementById('app'))
