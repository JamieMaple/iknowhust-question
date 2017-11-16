import PropTypes from 'prop-types'

import styles from '../style/ArticleList.sass'

const ArticleList = (props) =>
  <ul className={styles['article-list']}>
    {
      props.listItems.map((item, i) =>
        <li
          className={styles['list-item']}
          onClick={() => props.onItemClick(item, i)}
        >
          {
            item.thumbUrl &&
            <img src={item.thumbUrl}/>
          }
          <div>
            <h2 className={styles['list-item-title']}>{item.title}</h2>
            <p className={styles['list-item-content']} dangerouslySetInnerHTML={{ __html: item.highlighted || item.content }}></p>
          </div>
        </li>
      )
    }
  </ul>

ArticleList.propTypes = {
  listItems: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
}

ArticleList.defaultProps = {
  listItems: [],
  onItemClick: () => {},
}

export default ArticleList
