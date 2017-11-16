// import PropTypes from 'prop-types'

import styles from '../style/FeedbackEditor.sass'

const FeedbackEditor = ({ style, className, ...props }) =>
  <textarea className={styles['editor']} {...props}/>

export default FeedbackEditor
