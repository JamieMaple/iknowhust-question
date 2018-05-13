// import PropTypes from 'prop-types'
import Component from 'inferno-component'
import BScroll from 'better-scroll'

import styles from '../style/LetterGroup.sass'

import LettersSideBar from '../components/LettersSideBar'
// import TeacherListTopBar from '../components/TeacherListTopBar'
import TopBarWithTwoIcon from '../components/TopBarWithTwoIcon'
import LetterGroup from '../components/LetterGroup'

export default class TeachersInFaculty extends Component {
  state = {
    allLetters: '',
    teachersByLetters: {},
  }

  scrollWrapper = null
  scrollSubWrapper = null

  handleClick = (data) => (item, index) => {
    this.context.router.push(`/teachers/detail/${data[index].id}`)
  }

  render () {
    const data = this.state.teachersByLetters
    const title = decodeURI(this.props.params.faculty)
    return (
      <div>
        <TopBarWithTwoIcon
          style={{
            backgroundColor: '#fff',
            borderBottomColor: '#f3f5f8',
          }}
          title={title}

          onLeftIconClick={() => history.go(-1)}
        />
        <div className={styles['wrapper']}>
          <div
            ref={(ele) => { this.scrollWrapper = ele }}
            className={styles['list-wrapper']}
            data-scroll
          >
            <div className={styles['list-sub-wrapper']} ref={(ele) => { this.scrollSubWrapper = ele }}>
              {
                Object.keys(data)
                  .sort()
                  .map((key) => data[key])
                  .map((data) => (
                    <LetterGroup
                      letter={data[0].initial}
                      textList={data.map(({ name }) => `${name} - ${title}`)}
                      onItemClick={this.handleClick(data)}
                    />
                  ))
              }
            </div>
          </div>
          <LettersSideBar onRequestToJump={this.jumpHandler}/>
        </div>
      </div>
    )
  }

  async componentDidMount () {
    await this.fetchTeachersByLetter(this.props.params.faculty)
    this.bscroll = new BScroll(this.scrollWrapper, {
      scrollX: false,
      click: true,
      // scrollbar: true,
    })
  }

  jumpHandler = (letter) => {
    const index = this.state.allLetters.indexOf(letter)
    this.bscroll.scrollToElement(this.scrollSubWrapper.children[index], 300)
  }

  componentWillReceiveProps (nextProps) {
    const school = nextProps.params.faculty
    if (school !== this.props.params.faculty) {
      this.fetchTeachersByLetter(school)
    }
  }

  async fetchTeachersByLetter (school) {
    let callback = null
    const response = await fetch(`/api/v1/teachers/?school=${school}`)
    const teachersByLetters = await response.json()
    this.setState({
      allLetters: Object.keys(teachersByLetters).sort().join(''),
      teachersByLetters,
    }, callback)
    // await new Promise((resolve) => { callback = resolve })
  }
}
