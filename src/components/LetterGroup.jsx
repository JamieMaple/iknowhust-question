// import Component from 'inferno-component'
import styles from '../style/LetterGroup.sass'

import TextList from '../components/TextList'

const LetterGroup = ({ letter = 'a', textList = [], onItemClick }) => (
  <div>
    <header className={styles['letter-title']}>{letter.toUpperCase()}</header>
    <TextList withOrder={false} listItems={textList} onItemClick={onItemClick} />
  </div>
)

export default LetterGroup
