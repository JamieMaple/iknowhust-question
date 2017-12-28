import Component from 'inferno-component'
import styles from '../style/LettersSideBar.sass'

export default class LettersSideBar extends Component {
  render () {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    return (
      <div className={styles['sidebar']}>
        {
          letters.split('').map((letter) => (
            <span className={styles['sidebar-letter']}>{letter}</span>
          ))
        }
      </div>
    )
  }
}
