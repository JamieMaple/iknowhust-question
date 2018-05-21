import PropTypes from 'prop-types'
import Component from 'inferno-component'

import { camelizeKeys as camelize } from 'humps'

import ArticleList from '../components/ArticleList'
import SearchTopBar from '../components/SearchTopBar'

import styles from '../style/main.sass'
import articleStyles from '../style/ArticleList.sass'

export default class Search extends Component {
  static contextTypes = {
    questions: PropTypes.object,
    top: PropTypes.array,
    videotex: PropTypes.array,
  }

  state = {
    keyword: '',
    result: [],
    isLoading: false,
  }

  render () {
    const { history } = this.context

    const questions = this.state.result.filter((item) => !!item.id)
    // const articles = this.state.result.filter((item) => !!item.url)

    const keyword = decodeURI(this.props.params.keyword)

    return (
      <div >
        <SearchTopBar
          value={decodeURI(this.state.keyword)}
          onInput={(e) => this.setState({ keyword: encodeURI(e.target.value) })}
          onSubmit={() => {
            // console.log(`/search/${encodeURI(this.state.keyword)}`)
            window._czc.push(['_trackEvent', '搜索页', '再次搜索', this.state.keyword])
            history.push(`/search/${this.state.keyword}`)
          }}
        />
        {
          this.state.result.length > 0 || this.state.isLoading
            ? (
              this.state.isLoading
                ? <div style={{ textAlign: 'center', fontSize: '0.85rem' }}>正在加载...</div>
                : (
                  <div style={{ flexGrow: 1, overflow: 'scroll' }} data-scroll>
                    {
                      questions.length > 0 &&
                      [
                        <h1 className={articleStyles['related-question']}>{keyword}</h1>,
                        <ArticleList
                          listItems={questions}
                          onItemClick={(item) => history.push(`/question/${encodeURI(item.type)}/${item.id}`)}
                        />,
                      ]
                    }
                    {/* {
                      articles.length > 0 &&
                      [
                        <h1 className={articleStyles['related-article']}>{keyword}</h1>,
                        <ArticleList
                          listItems={articles}
                          onItemClick={(item) => window.open(item.url)}
                        />,
                      ]
                    } */}
                  </div>
                )
            ) : (
              <div className={styles['i-dont-know']}>
                <div>啊！这个我真不知道！</div>
                <div>随便点进一个答案反馈给我！</div>
              </div>
            )
        }
      </div>
    )
  }

  componentWillMount () {
    this.componentWillReceiveProps(this.props)
  }

  async componentWillReceiveProps (nextProps) {
    this.setState({
      isLoading: true,
      keyword: nextProps.params.keyword,
    })
    const searchResponse = await fetch(`api/v1/search/?text=${nextProps.params.keyword}`)
    const result = await searchResponse.json().then(camelize)

    this.context.updateWeixinConfig({
      title: `iKnow 华科 | “${decodeURI(nextProps.params.keyword)}”相关的问题都在这里啦！`, // 分享标题
      // generate 摘要
      desc: result.map(({title}, i) => (i + 1) + '.' + title).join(' \n'), // 分享链接
      success: () => {
        window._czc.push(['_trackEvent', '搜索页', '分享', '分享成功'])
      },
      cancel: function () {
        window._czc.push(['_trackEvent', '搜索页', '分享', '分享取消'])
      },
    })

    this.setState({
      isLoading: false,
      result,
    })
  }
}
