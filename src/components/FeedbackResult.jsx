import PropTypes from 'prop-types'

import styles from '../style/FeedbackResult.sass'

import successImage from '../assets/success.png'

const FeedbackResult = (props) =>
  <div className={styles['feedback-result']}>
    <div className={styles['feedback-success-wrapper']}>
      <h1 className={styles['title']}>爱闹已经收到反馈啦！</h1>
      <img src={successImage}/>
      <button onClick={() => props.onRequestBack()}>返回主页</button>
    </div>
  </div>

FeedbackResult.propTypes = {
  onRequestBack: PropTypes.func.isRequired,
}

FeedbackResult.defaultProps = {
  onRequestBack: () => {},
}

export default FeedbackResult
