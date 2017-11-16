// import  from 'inferno'
import PropTypes from 'prop-types'
import Component from 'inferno-component'
import { Route, Router } from 'inferno-router'
import createBrowserHistory from 'history/createBrowserHistory'

import { camelizeKeys as camelize } from 'humps'

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
  allQuestions = []
  top = []
  videotex = []

  getChildContext () {
    return {
      questions: this.questions,
      top: this.top,
      videotex: this.videotex,
      allQuestions: this.allQuestions,
    }
  }

  static childContextTypes = {
    questions: PropTypes.object,
    top: PropTypes.array,
    videotex: PropTypes.array,
  }

  async componentWillMount () {
    this.top = await (await fetch('api/v1/questions/top/')).json().then(camelize)
    this.videotex = await (await fetch('api/v1/videotexs/')).json().then(camelize)
    const questionResponse = await fetch('api/v1/questions/')
    const questions = await questionResponse.json().then(camelize)
    this.allQuestions = questions

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
