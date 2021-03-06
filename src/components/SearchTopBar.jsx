import PropTypes from 'prop-types'

import styles from '../style/SearchTopBar.sass'

const SearchTopBar = ({ style, className, onSubmit, placeholder, ...others }) =>
  <div
    className={(className || '') + ' ' + styles['search-bar']}
    style={style}
  >
    <input
      placeholder={placeholder || '你不知道的我都知道'}
      {...others}
      onKeyDown={(e) => e.keyCode === 13 ? onSubmit() : void 0}
    />
    <button
      className={styles['search-icon-button']}
      onClick={() => onSubmit()}
    />
  </div>

SearchTopBar.propTypes = {
  value: PropTypes.string.isRequired,
  onInput: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

SearchTopBar.defaultProps = {
  value: '',
  onInput: () => {},
  onSubmit: () => {},
}
export default SearchTopBar
