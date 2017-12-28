// import Component from 'inferno-component'
// import PropTypes from 'prop-types'
import styles from '../style/TextList.sass'

const MixedTeachersList = ({ relatedTeachers = [], relatedFaculties = [] }) => (
  <ul className={styles['text-list']} data-scroll>
    {relatedFaculties.length > 0 && renderFacultiesList(relatedFaculties)}
    {relatedTeachers.length > 0 && renderTeachersList(relatedTeachers)}
  </ul>
)

function renderTeachersList (list) {
  return [].concat(
    <li className={styles['list-item-header']}>相关老师</li>,
    list.map((item) => (
      <li className={styles['list-item']}>{item}</li>
    ))
  )
}

function renderFacultiesList (list) {
  return [].concat(
    <li className={styles['list-item-header']}>相关学院</li>,
    list.map((item) => (
      <li className={styles['list-item']}>{item}</li>
    ))
  )
}

// MixedTeachersList.propTypes = {
//   relatedTeachers: 
// }

export default MixedTeachersList
