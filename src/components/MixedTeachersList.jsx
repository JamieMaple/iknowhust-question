// import Component from 'inferno-component'
// import PropTypes from 'prop-types'
import styles from '../style/TextList.sass'

const MixedTeachersList = ({ relatedTeachers = [], relatedFaculties = [], onFacultiesClick, onTeachersClick }) => (
  <ul
    className={styles['text-list']}
    data-scroll
  >
    {relatedFaculties.length > 0 && renderFacultiesList(relatedFaculties, onFacultiesClick)}
    {relatedTeachers.length > 0 && renderTeachersList(relatedTeachers, onTeachersClick)}
  </ul>
)

function renderTeachersList (list, onClick) {
  return [].concat(
    <li className={styles['list-item-header']}>相关老师</li>,
    list.map((item) => (
      <li
        onClick={() => onClick(item)}
        className={styles['list-item']}
      >
        {item.name}
      </li>
    ))
  )
}

function renderFacultiesList (list, onClick) {
  return [].concat(
    <li className={styles['list-item-header']}>相关学院</li>,
    list.map((item) => (
      <li
        onClick={() => onClick(item)}
        className={styles['list-item']}
      >
        {item.name}
      </li>
    ))
  )
}

// MixedTeachersList.propTypes = {
//   relatedTeachers: 
// }

export default MixedTeachersList
