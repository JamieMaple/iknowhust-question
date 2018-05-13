import PropTypes from 'prop-types'

import styles from '../style/TextList.sass'
import Power from './Power'

const TextList = (props) => {
  return (
    <ul className={styles['text-list']} style={props.style}>
      {
        props.listItems.map((item, i) =>
          <li
            key={item.id}
            className={`${styles['list-item']} ${props.hasPower && i >= props.listItems.length - 1 ? styles['last-list-item'] : ''}`}
            onClick={() => {
              props.onItemClick(item, i)
            }}
          >
            {props.withOrder ? i + 1 + '. ' : ''}{item}
          </li>
        )
      }
      {
        props.hasPower
          ? <Power />
          : null
      }
    </ul>
  )
}

TextList.propTypes = {
  listItems: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
}

TextList.defaultProps = {
  listItems: [],
  onItemClick: () => {},
}

export default TextList
