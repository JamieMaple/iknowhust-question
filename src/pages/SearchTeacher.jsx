import Component from 'inferno-component'

import SearchTopBar from '../components/SearchTopBar'
import MixedTeachersList from '../components/MixedTeachersList'

export default class SearchTeacher extends Component {
  state = {
    isLoading: false,
    keyword: '',
    teachers: [],
    faculties: [],
  }

  render () {
    const { router } = this.context

    return (
      <div>
        <SearchTopBar
          placeholder={'输入学院 / 老师姓名搜索'}
          value={decodeURI(this.state.keyword)}
          onInput={(e) => this.setState({ keyword: encodeURI(e.target.value) })}
          onSubmit={() => {
          // console.log(`/search/${encodeURI(this.state.keyword)}`)
            window._czc.push(['_trackEvent', '搜索教师页', '搜索', decodeURI(this.state.keyword)])
            router.push(`/teachers/search/${this.state.keyword}`)
          }}
        />
        {
          this.state.isLoading
            ? (
              <div style={{ textAlign: 'center', fontSize: '0.85rem' }}>正在加载...</div>
            )
            : (
              <MixedTeachersList
                relatedTeachers={this.state.teachers}
                relatedFaculties={this.state.faculties}
              />
            )
        }
      </div>
    )
  }

  componentWillReceiveProps (nextProps) {
    const preKeyword = this.props.params.keyword
    const keyword = nextProps.params.keyword

    if (preKeyword === keyword) {
      return
    }

    this.fetchSearchResult(keyword)
  }

  componentDidMount () {
    this.fetchSearchResult(this.props.params.keyword || '')
  }

  async fetchSearchResult (keyword) {
    if (!keyword) {
      return
    }
    this.setState({
      isLoading: true,
      keyword,
    })

    const nameResponse = await fetch(`api/v1/teachers/search/?name=${keyword}`)
    const facultyResponse = await fetch(`api/v1/teachers/search/?school=${keyword}`)

    const teachersMapByName = {}
    const faculties = {}

    ;(await nameResponse.json()).forEach((teacher) => {
      teachersMapByName[teacher.name] = teacher
      faculties[teacher.school] += ' '
    })

    ;(await facultyResponse.json()).forEach((teacher) => {
      teachersMapByName[teacher.name] = teacher
      faculties[teacher.school] += ' '
    })

    this.setState({
      isLoading: false,
      teachers: Object.values(teachersMapByName).map(({name}) => name),
      faculties: Object.keys(faculties).sort((a, b) => a.length - b.length),
    })
  }
}
