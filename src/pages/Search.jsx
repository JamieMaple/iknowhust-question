import PropTypes from 'prop-types'

import Component from 'inferno-component'

import ArticleList from '../components/ArticleList'
import SearchTopBar from '../components/SearchTopBar'

import styles from '../style/main.sass'

export default class Entry extends Component {
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
    const { router } = this.context
    return (
      <div>
        <SearchTopBar
          value={this.state.keyword}
          onInput={(e) => this.setState({ keyword: e.target.value })}
          onSubmit={() => router.push(`/search/${this.state.keyword}`)}
        />
        {
          this.state.result.length > 0 || this.state.isLoading
            ? <ArticleList listItems={this.state.result}/>
            : (
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
    const result = await searchResponse.json()

    this.setState({
      isLoading: false,
      result,
    })
  }
}
