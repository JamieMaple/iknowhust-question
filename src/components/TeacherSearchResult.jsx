// import PropTypes from 'prop-types'

import styles from '../style/FeedbackResult.sass'
import feedbackStyles from '../style/QuestionList.sass'

import failureImage from '../assets/sorry@3x.png'

const TeacherSearchResult = (props) =>
  <div className={styles['feedback-result']}>
    <div className={styles['feedback-success-wrapper']}>
      {/* <h1 className={styles['title']}>爱闹已经收到反馈啦！</h1> */}
      <img src={failureImage}/>
      {/* <button onClick={() => props.onRequestBack()}>返回主页</button> */}
      {
        [
          '抱歉！',
          '爱闹没有找到这位老师的联系方式！',
          '你可以拨打查号台试试看！',
          '电话：87541114',
          '记得反馈给爱闹哦！',
        ].map((text) => (
          <p className={styles['blue-para']}>{text}</p>
        ))
      }
    </div>
    <div
      className={feedbackStyles['feedback-bottom']}
      onClick={props.onFeedbackClick}
    >
      <a className={feedbackStyles['feedback-link']}>有问题？反馈给爱闹！</a>
    </div>
  </div>

// FeedbackResult.propTypes = {
//   onRequestBack: PropTypes.func.isRequired,
// }

// FeedbackResult.defaultProps = {
//   onRequestBack: () => {},
// }

export default TeacherSearchResult
