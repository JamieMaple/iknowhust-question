import PropTypes from 'prop-types'

import styles from '../style/TabHeader.sass'

const TabHeader = props =>
  <div className={styles['tab-header']}>
    {
      props.tabs.map(tab =>
        <div>
          { tab }
        </div>
      )
    }
  </div>

TabHeader.propTypes = {
  tabs: PropTypes.array.isRequired,
}

TabHeader.defaultProps = {
  tabs: [],
}

export default TabHeader
