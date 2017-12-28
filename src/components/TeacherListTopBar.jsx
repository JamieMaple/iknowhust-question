import PropTypes from 'prop-types'

import styles from '../style/QuestionListTop.sass'

const TeacherListTopBar = ({ className, style, ...props }) =>
  <header className={styles['questions-list-header'] + ' ' + className} style={style}>
    <div
      className={styles['questions-list-button'] + ' ' + styles['home']}
      onClick={props.onBackRequest}
    />
    <h1 className={styles['questions-list-title']}>{props.title}</h1>
    <div
      className={styles['questions-list-button'] + ' ' + styles['placeholder']}
    />
  </header>

TeacherListTopBar.propTypes = {
  onBackRequest: PropTypes.func.isRequired,
}

TeacherListTopBar.defaultProps = {
  onBackRequest: () => {},
}

export default TeacherListTopBar
