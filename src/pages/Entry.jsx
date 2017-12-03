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
    activeTabIndex: isNaN(this.props.params.index)
      ? 0
      : Number(this.props.params.index),
    keyword: '',
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
        <SearchTopBar
          value={this.state.keyword}
          onInput={(e) => this.setState({ keyword: e.target.value })}
          onSubmit={() => {
            window._czc.push(['_trackEvent', '主页', '搜索', this.state.keyword])
            router.push(`/search/${encodeURIComponent(this.state.keyword)}`)
          }}
        />
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
            onItemClick={(item, i) =>
              router.push(`/question/${encodeURIComponent(this.context.top[i].type)}/${this.context.top[i].id}`)
            }
          />
          {
            Object.keys(this.context.questions).map((key) =>
              <TextList
                listItems={Object.keys(this.context.questions[key]) || []}
                onItemClick={(item) => {
                  router.replace(`/${this.state.activeTabIndex}`)
                  router.push(`/question/${encodeURIComponent(item)}`)
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

  componentDidMount () {
    this.context.updateWeixinConfig({
      title: 'iKnow 华科 | 你不知道的我们都知道！', // 分享标题
      // generate 摘要
      desc: this.context.top.map(({title}, i) => (i + 1) + '.' + title).join(' \n'), // 分享链接
      success: () => {
        window._czc.push(['_trackEvent', '主页', '分享', '分享成功'])
      },
      cancel: function () {
        window._czc.push(['_trackEvent', '主页', '分享', '分享取消'])
      },
    })
  }
}
