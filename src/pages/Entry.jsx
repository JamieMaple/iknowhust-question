import Component from 'inferno-component'

import TabHeader from '../components/TabHeader'
import TextList from '../components/TextList'
import SearchTopBar from '../components/SearchTopBar'
import SwipeList from '../components/SwipeList'

export default class App extends Component {
  render () {
    return (
      <div>
        <SearchTopBar />
        <TabHeader tabs={['呵呵', '哈哈', '呵呵', '哈哈']}/>
        <SwipeList>
          <TextList listItems={['学分相关', '学分相关', '学分相关', '学分相关', '学分相关', '学分相关', '学分相关', '学分相关', '学分相关', '学分相关', '学分相关', '学分相关']}/>
          <TextList listItems={['学分相关', '学分相关', '学分相关', '学分相关', '学分相关', '学分相关', '学分相关', '学分相关', '学分相关', '学分相关', '学分相关', '学分相关']}/>
          <TextList listItems={['学分相关', '学分相关', '学分相关', '学分相关', '学分相关', '学分相关', '学分相关', '学分相关', '学分相关', '学分相关', '学分相关', '学分相关']}/>
        </SwipeList>
      </div>
    )
  }
}
