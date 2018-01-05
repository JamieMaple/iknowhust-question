// import Component from 'inferno-component'
import styles from '../style/LetterGroup.sass'

import TextList from '../components/TextList'

const LetterGroup = ({ letter = 'a', textList = [] }) => (
  <div>
    <header className={styles['letter-title']}>{letter.toUpperCase()}</header>
    <TextList withOrder={false} listItems={textList}/>
  </div>
)

export default LetterGroup
