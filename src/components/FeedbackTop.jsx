import PropTypes from 'prop-types'

import styles from '../style/QuestionListTop.sass'

const Feedback = ({ className, style, ...props }) =>
  <header className={styles['questions-list-header'] + ' ' + className} style={style}>
    <div
      className={styles['questions-list-button'] + ' ' + styles['close']}
      onClick={() => props.onCloseRequest()}
    />
    <h1 className={styles['questions-list-title']}>{props.title}</h1>
    <div
      className={styles['questions-list-button'] + ' ' + styles['send']}
      onClick={() => props.onSendRequest()}
    />
  </header>

Feedback.propTypes = {
  onCloseRequest: PropTypes.func.isRequired,
  onSendRequest: PropTypes.func.isRequired,
}

Feedback.defaultProps = {
  onCloseRequest: () => {},
  onSendRequest: () => {},
}

export default Feedback
