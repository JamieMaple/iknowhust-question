import PropTypes from 'prop-types'

import styles from '../style/TextList.sass'

const TabHeader = props =>
  <ul className={styles['text-list']}>
    {
      props.listItems.map(item =>
        <li></li>
      )
    }
  </ul>

TabHeader.propTypes = {
  listItems: PropTypes.array.isRequired,
}

TabHeader.defaultProps = {
  listItems: [],
}

export default TabHeader
