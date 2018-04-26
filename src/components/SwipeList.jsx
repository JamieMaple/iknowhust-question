import PropTypes from 'prop-types'
import Component from 'inferno-component'
import Swipe from 'swipe-js-iso'

import styles from '../style/SwipeList.sass'

export default class SwipeList extends Component {
  static propTypes = {
    onSlideChange: PropTypes.func.isRequired,
    activeIndex: PropTypes.node.isRequired,
  }

  static defaultProps = {
    onSlideChange: () => {},
    activeIndex: 0,
  }

  swipeElement = null
  swiper = null

  state = {
    childHeight: undefined,
  }

  render () {
    return (
      <div className={styles['swipe']} ref={(ele) => { this.swipeElement = ele }}>
        {
          // this.props.children.map(child =>
          //   <div className={styles['swipe-wrap']}>
          //     {child}
          //   </div>
          // )
        }
        {
          <div className={styles['swipe-wrap']}>
            {
              this.props.children.map((child) =>
                <div>
                  <div
                    style={{
                      height: this.state.childHeight,
                    }}
                  >
                    {child}
                  </div>
                </div>
              )
            }
          </div>
        }
      </div>
    )
  }

  componentDidMount () {
    if (this.swipeElement instanceof HTMLElement) {
      this.swiper = new Swipe(this.swipeElement, {
        startSlide: this.props.activeIndex,
        speed: 400,
        auto: 0,
        continuous: false,
        disableScroll: false,
        stopPropagation: false,
        callback: () => {
          this.props.onSlideChange(this.swiper.getPos())
        },
      })
      window.swiper = this.swiper
      this.setState({
        childHeight: this.swipeElement.clientHeight + 'px',
      })
    }
  }

  componentWillUnmount () {
    this.swiper.kill()
  }

  // shouldComponentUpdate (nextProps, nextState) {
  //   // console.log('a')
  //   // return false
  // }

  componentWillReceiveProps (nextProps) {
    if (nextProps.activeIndex !== this.props.activeIndex) {
      this.swiper.slide(nextProps.activeIndex, 400)
    }
  }
}

