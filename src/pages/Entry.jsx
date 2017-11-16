import PropTypes from 'prop-types'

import Component from 'inferno-component'

import TabHeader from '../components/TabHeader'
import TextList from '../components/TextList'
import ArticleList from '../components/ArticleList'
import SearchTopBar from '../components/SearchTopBar'
import SwipeList from '../components/SwipeList'

export default class Entry extends Component {
  static contextTypes = {
    questions: PropTypes.object,
    top: PropTypes.array,
    videotex: PropTypes.array,
  }

  state = {
    activeTabIndex: isNaN(this.props.params.index) ? 0 : this.props.params.index,
  }

  handleIndexChange = (index) => {
    const { router } = this.context
    this.setState({ activeTabIndex: index }
      , () => router.replace(`/${this.state.activeTabIndex}`))
  }

  render () {
    const { router } = this.context
    return (
      <div>
        <SearchTopBar/>
        <TabHeader
          activeIndex={this.state.activeTabIndex}
          tabs={[
            '热门',
            ...Object.keys(this.context.questions),
            '吃喝',
          ]}
          onRequestChangeTab={this.handleIndexChange}
        />
        <SwipeList
          activeIndex={this.state.activeTabIndex}
          onSlideChange={this.handleIndexChange}
        >
          <TextList
            listItems={this.context.top.map((data) => data.title)}
          />
          {
            Object.keys(this.context.questions).map((key) =>
              <TextList
                listItems={Object.keys(this.context.questions[key]) || []}
                onItemClick={(item) => {
                  router.replace(`/${this.state.activeTabIndex}`)
                  router.push(`/question/${item}`)
                }}
              />
            )
          }
          <ArticleList
            listItems={this.context.videotex}
            onItemClick={(item) => {
              router.replace(`/${this.state.activeTabIndex}`)
              window.open(item.url)
            }}
          />
        </SwipeList>
      </div>
    )
  }
}
