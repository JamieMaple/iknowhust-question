import Component from 'inferno-component'

// import SearchTopBar from '../components/SearchTopBar'
// import MixedTeachersList from '../components/MixedTeachersList'
import TopBarWithTwoIcon from '../components/TopBarWithTwoIcon'
import TeacherDetailBox from '../components/TeacherDetailBox'
import TextList from '../components/TextList'

import titleStyle from '../style/TeacherDetail.sass'

export default class TeacherDetail extends Component {
  render () {
    return (
      <div>
        <TopBarWithTwoIcon
        // little bit fixture for style
          style={{ backgroundColor: '#fff', borderBottomColor: '#F3F5F8' }}
          leftIconClass={'home'}
          rightIconClass={'placeholder'}
          title={'张林 - 电磁'}
        />
        <TeacherDetailBox/>
        <h1
          style={{ flexShrink: 0 }}
          className={titleStyle['related-school-title']}
        >相关学院</h1>
        <TextList withOrder={false} listItems={['aaaa', '安大厦法定官方']}/>
      </div>
    )
  }
}
