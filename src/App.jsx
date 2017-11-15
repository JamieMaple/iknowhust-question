// import  from 'inferno'
import Component from 'inferno-component'
import { Route, Router } from 'inferno-router'
import createBrowserHistory from 'history/createBrowserHistory'

import Entry from './pages/Entry'

const history = createBrowserHistory()

export default class App extends Component {
  render () {
    return (
      <Router history={history}>
        <Route path={'/'} component={Entry}/>
        <Route path={'/search'} component={Entry}/>
      </Router>
    )
  }
}
