import PropTypes from 'prop-types'
import Component from 'inferno-component'

import styles from '../style/QuestionListTop.sass'

export default class QuestionListTop extends Component {
  static propTypes = {
    menuList: PropTypes.array.isRequired,
    onHomeButtonClick: PropTypes.func.isRequired,
    onMenuItemClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    menuList: [],
    onHomeButtonClick: () => {},
    onMenuItemClick: () => {},
  }

  state = {
    menuHidden: true,
  }

  render () {
    const { className, style, ...props } = this.props

    return (
      <header className={styles['questions-list-header'] + ' ' + className} style={style}>
        <div className={styles['questions-list-button'] + ' ' + styles['home']}/>
        <h1 className={styles['questions-list-title']}>校园网相关</h1>
        <div
          className={styles['questions-list-button'] + ' ' + styles['menu']}
          onClick={() => this.setState((preState) => ({ menuHidden: !preState.menuHidden }))}
          // onBlur={() => this.setState((preState) => ({ menuHidden: true }))}
        >
          {
            props.menuList.length > 0 &&
            <ul className={styles['menu-ul'] + ' ' + (!this.state.menuHidden ? styles['show'] : '')}>
              {
                props.menuList.map((item, i) =>
                  <li
                    onClick={(e) => {
                      e.stopPropagation()
                      props.onMenuItemClick(item, i)
                      this.setState((preState) => ({ menuHidden: true }))
                    }}
                  >
                    {item}
                  </li>
                )
              }
            </ul>
          }
        </div>
      </header>
    )
  }
}
