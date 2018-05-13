import Component from 'inferno-component'

import SearchTopBar from '../components/SearchTopBar'
import MixedTeachersList from '../components/MixedTeachersList'
import TeacherSearchResult from '../components/TeacherSearchResult'

export default class SearchTeacher extends Component {
  state = {
    isLoading: false,
    hasSearchedOnce: false,
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
            if (!this.state.keyword) {
              router.push('/')
              return
            }
            // console.log(`/search/${encodeURI(this.state.keyword)}`)
            window._czc.push(['_trackEvent', '搜索教师页', '搜索', decodeURI(this.state.keyword)])
            router.push(`/teachers/search/${this.state.keyword}`)
          }}
        />
        {
          this.state.isLoading
            ? (
              <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#e5e5e5' }}>正在加载...</div>
            )
            : this.state.faculties.length > 0 || this.state.teachers.length > 0
              ? (
                <MixedTeachersList
                  relatedTeachers={this.state.teachers}
                  relatedFaculties={this.state.faculties}
                  onFacultiesClick={(e) => {
                    router.push(`/teachers/${e.name}`)
                  }}
                  onTeachersClick={(e) => {
                    router.push(`/teachers/detail/${e.id}`)
                  }}
                />
              )
              : this.state.hasSearchedOnce ? <TeacherSearchResult /> : null

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
    if (!this.state.hasSearchedOnce) {
      this.setState((prev) => ({
        ...prev,
        hasSearchedOnce: true,
      }))
    }
    this.setState({
      isLoading: true,
      keyword,
    })

    const response = await fetch(`api/v1/teachers/search/?text=${keyword}`)

    const teachersMapByName = {}
    const faculties = {}

    ;(await response.json()).forEach((teacher) => {
      teachersMapByName[teacher.name] = teacher
      faculties[teacher.school] += ' '
    })

    this.setState({
      isLoading: false,
      teachers: Object.values(teachersMapByName).map(({name, id}) => ({name, id})),
      faculties: Object.keys(faculties).sort((a, b) => a.length - b.length).map((name) => ({ name })),
    })
  }
}
