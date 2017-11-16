// import  from 'inferno'
import PropTypes from 'prop-types'
import Component from 'inferno-component'
import { Route, Router } from 'inferno-router'
import createBrowserHistory from 'history/createBrowserHistory'

import Entry from './pages/Entry'

const history = createBrowserHistory()

export default class App extends Component {
  render () {
    return (
      this.state.loaded
        ? (
          <Router history={history}>
            <Route path={'/'} component={Entry}/>
            <Route path={'/search'} component={Entry}/>
          </Router>
        )
        : null
    )
  }

  state = {
    loaded: false,
  }

  questions = {}
  top = []
  videotex = []

  getChildContext () {
    return {
      questions: this.questions,
      top: this.top,
      videotex: this.videotex,
    }
  }

  static childContextTypes = {
    questions: PropTypes.object,
    top: PropTypes.array,
    videotex: PropTypes.array,
  }

  async componentWillMount () {
    this.top = await (await fetch('api/v1/questions/top/')).json()
    this.videotex = await (await fetch('api/v1/videotexs/')).json()
    const questionResponse = await fetch('api/v1/questions/')
    const questions = await questionResponse.json()

    const questionSetByCategory = questions.reduce((set, question) => {
      if (!set[question.category]) set[question.category] = []

      set[question.category].push(question)
      return set
    }, {})

    const questionSetByType = Object.keys(questionSetByCategory).reduce((set, category) => {
      set[category] = questionSetByCategory[category].reduce((set, question) => {
        if (!set[question.type]) set[question.type] = []

        set[question.type].push(question)
        return set
      }, {})
      return set
    }, {})

    this.questions = questionSetByType
    // try {
    //   this.setState({ loaded: true })
    // } catch (e) {}
    this.setState({ loaded: true })
  }
}
