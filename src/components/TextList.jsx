import PropTypes from 'prop-types'

import styles from '../style/TextList.sass'

const TextList = props =>
  <ul className={styles['text-list']}>
    {
      props.listItems.map((item, i) =>
        <li
          key={item}
          className={styles['list-item']}
          onClick={props.onItemClick(item, i)}
        >
          {i + 1}. {item}
        </li>
      )
    }
  </ul>

TextList.propTypes = {
  listItems: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
}

TextList.defaultProps = {
  listItems: [],
  onItemClick: () => {},
}

export default TextList
