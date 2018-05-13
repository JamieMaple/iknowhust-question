import PropTypes from 'prop-types'

import styles from '../style/QuestionListTop.sass'

const TopBarWithTwoIcon = ({ className, style, ...props }) =>
  <header className={styles['questions-list-header'] + ' ' + className} style={style}>
    <div
      className={styles['questions-list-button'] + ' ' + styles[props.leftIconClass]}
      onClick={props.onLeftIconClick}
    >
      {props.leftIconContent}
    </div>
    <h1 className={styles['questions-list-title']}>{props.title}</h1>
    <div
      className={styles['questions-list-button'] + ' ' + styles[props.rightIconClass]}
      onClick={props.onRightIconClick}
    >
      {props.rightIconContent}
    </div>
  </header>

TopBarWithTwoIcon.propTypes = {
  onLeftIconClick: PropTypes.func,
  onRightIconClick: PropTypes.func,

  leftIconClass: PropTypes.string,
  rightIconClass: PropTypes.string,
  leftIconContent: PropTypes.element,
  rightIconContent: PropTypes.element,
}

TopBarWithTwoIcon.defaultProps = {
  onLeftIconClick: () => history.go(-1),
  onRightIconClick: () => {},

  leftIconClass: 'home',
  rightIconClass: 'placeholder',
  leftIconContent: null,
  rightIconContent: null,
}

export default TopBarWithTwoIcon
