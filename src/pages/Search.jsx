import PropTypes from 'prop-types'
import Component from 'inferno-component'

import { camelizeKeys as camelize } from 'humps'

import ArticleList from '../components/ArticleList'
import SearchTopBar from '../components/SearchTopBar'

import styles from '../style/main.sass'

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
    return (
      <div>
        <SearchTopBar
          value={decodeURI(this.state.keyword)}
          onInput={(e) => { this.setState({ keyword: encodeURI(e.target.value) }); console.log('aaa') }}
          onSubmit={() => {
            // console.log(`/search/${encodeURI(this.state.keyword)}`)
            history.push(`/search/${this.state.keyword}`)
          }}
        />
        {
          this.state.result.length > 0 || this.state.isLoading
            ? (
              <ArticleList
                listItems={this.state.result}
                onItemClick={(item) => {
                  if (item.id && !item.url) {
                    history.push(`/question/${encodeURI(item.type)}/${item.id}`)
                  } else {
                    window.open(item.url)
                  }
                }}
              />
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
    })

    this.setState({
      isLoading: false,
      result,
    })
  }
}
