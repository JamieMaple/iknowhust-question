import Component from 'inferno-component'
import styles from '../style/LettersSideBar.sass'

export default class LettersSideBar extends Component {
  rootElement = null
  rootElementTop = 0
  rootElementHeight = 0
  rootElementChildHeight = 0

  state = {
    inTouch: false,
    currentLetter: '',
    translate: 0,
  }

  render () {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    return (
      <div
        className={styles['sidebar']}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
        ref={(ele) => { this.rootElement = ele }}
      >
        {
          letters.split('').map((letter) => (
            <span
              className={styles['sidebar-letter'] + ' ' + (this.state.currentLetter === letter ? styles['active'] : '')}
            >
              {letter}
              {/* <div className={styles['sidebar-tip']}>{letter}</div> */}
            </span>
          ))
        }

        <div
          className={styles['sidebar-tip-wrapper']}
          style={{ transform: `translate3D(0,${this.state.translate}px,0)` }}
        >
          A
          <div
            className={styles['sidebar-tip']}
            style={{ visibility: (this.state.inTouch && this.state.currentLetter) ? 'visible' : 'hidden' }}
          >{this.state.currentLetter}</div>
        </div>
      </div>
    )
  }

  onTouchStart = (e) => {
    e.preventDefault()
    const rect = this.rootElement.getBoundingClientRect()
    const rootElementChild = this.rootElement.children[0]

    this.rootElementChildHeight = rootElementChild.clientHeight
    this.rootElementTop = rect.top
    this.rootElementHeight = rect.height
    this.setState({
      inTouch: true,
    })
  }

  onTouchMove = (e) => {
    // e.preventDefault()
    if (this.state.inTouch) {
      const touch = e.touches[0]
      const currentLetterElement = document.elementFromPoint(window.innerWidth - 10, touch.clientY)

      if (!currentLetterElement) {
        return
      }

      // console.log()

      // let translate = touch.clientY - this.rootElementTop
      let translate = currentLetterElement.offsetTop
      if (translate < 0) translate = 0
      if (translate > this.rootElementHeight) translate = this.rootElementHeight - this.rootElementChildHeight
      this.setState({
        translate,
        currentLetter: currentLetterElement.innerHTML[0],
      })
    }
  }

  onTouchEnd = (e) => {
    this.setState({
      inTouch: false,
      currentLetter: '',
    })
  }
}
