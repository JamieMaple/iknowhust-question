import Component from 'inferno-component'

import SearchTopBar from '../components/SearchTopBar'
import MixedTeachersList from '../components/MixedTeachersList'

export default class SearchTeacher extends Component {
  state = {
    keyword: '',
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
          <MixedTeachersList
            relatedTeachers={['11111', 'w23456', '11111', 'w23456', '11111', 'w23456']}
            relatedFaculties={['adasf', 'adssdsafsd']}
          />
        }
      </div>
    )
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
  }
}
