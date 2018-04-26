import PropTypes from 'prop-types'

import styles from '../style/TabHeader.sass'

const TabHeader = ({ style, className, activeIndex, tabs, ...others }) =>
  <div className={styles['tab-header']}>
    {
      tabs.map((tab, i) =>
        <div
          className={styles['tab'] + ' ' + (i === activeIndex ? styles['active'] : '')}
          onClick={() => others.onRequestChangeTab(i)}
        >
          { tab }
        </div>
      )
    }
    <div
      className={styles['highlight-bar']}
      style={{
        transform: `translateX(${100 * activeIndex + '%'})scale(0.5)`,
        width: 100 / tabs.length + '%',
      }}
    />
  </div>

TabHeader.propTypes = {
  tabs: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
  onRequestChangeTab: PropTypes.func.isRequired,
}

TabHeader.defaultProps = {
  tabs: [],
  activeIndex: 0,
  onRequestChangeTab: () => {},
}

export default TabHeader
