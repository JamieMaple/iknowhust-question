import Component from 'inferno-component'

// import SearchTopBar from '../components/SearchTopBar'
// import MixedTeachersList from '../components/MixedTeachersList'
import TopBarWithTwoIcon from '../components/TopBarWithTwoIcon'
import TeacherDetailBox from '../components/TeacherDetailBox'
import TextList from '../components/TextList'

import titleStyle from '../style/TeacherDetail.sass'

export default class TeacherDetail extends Component {
  state = {
    name: '',
    school: '',
    title: '',
    telephone: '',
    email: '',
    office: '',
    related: [],
  }

  async fetchTeacherDetails (id) {
    if (typeof id === 'undefined') {
      id = this.props.params.id
    }
    const res = await fetch(`/api/v1/teachers/${id}/`)
    const data = await res.json()
    this.setState(() => ({...data}))
  }

  componentDidMount () {
    this.fetchTeacherDetails()
  }

  componentWillReceiveProps (nextProps) {
    this.fetchTeacherDetails(nextProps.params.id)
  }

  handleItemClick = (item, index) => {
    this.context.router.push(`/teachers/detail/${this.state.related[index].id}`)
  }

  handleBack = () => {
    this.context.router.push('/teachers')
  }

  render () {
    return (
      <div>
        <TopBarWithTwoIcon
        // little bit fixture for style
          style={{ backgroundColor: '#fff', borderBottomColor: '#F3F5F8' }}
          leftIconClass={'home'}
          rightIconClass={'placeholder'}
          title={this.state.name}
          onLeftIconClick={this.handleBack}
        />
        <TeacherDetailBox
          name={this.state.name}
          school={this.state.school}
          title={this.state.title}
          telephone={this.state.telephone}
          email={this.state.email}
          office={this.state.office}
        />
        <h1
          style={{ flexShrink: 0 }}
          className={titleStyle['related-school-title']}
        >相关老师</h1>
        <TextList withOrder={false} listItems={this.state.related.map((item) => item.name).slice(0, 20)} onItemClick={this.handleItemClick} />
      </div>
    )
  }
}
