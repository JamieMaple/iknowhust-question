// import  from 'inferno'
import Component from 'inferno-component'

import TabHeader from './components/TabHeader'
import TextList from './components/TextList'

export default class App extends Component {
  render () {
    return (
      <div>
        <TabHeader/>
        <TextList/>
      </div>
    )
  }
}
