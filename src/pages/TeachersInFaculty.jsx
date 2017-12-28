// import PropTypes from 'prop-types'
import Component from 'inferno-component'

import LettersSideBar from '../components/LettersSideBar'
// import TeacherListTopBar from '../components/TeacherListTopBar'
import TopBarWithTwoIcon from '../components/TopBarWithTwoIcon'

export default class TeachersInFaculty extends Component {
  render () {
    return (
      <div>
        <TopBarWithTwoIcon
          style={{ backgroundColor: '#fff' }}
          title={this.props.params.faculty}

          onLeftIconClick={() => history.go(-1)}
        />
        <div style={{ position: 'relative' }}>
          <LettersSideBar />
        </div>
      </div>
    )
  }
}
