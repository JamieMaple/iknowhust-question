import PropTypes from 'prop-types'
import Component from 'inferno-component'

import BScroll from 'better-scroll'

import styles from '../style/QuestionList.sass'

export default class QuestionList extends Component {
  static propTypes = {
    questionList: PropTypes.array.isRequired,
  }

  static defaultProps = {
    questionList: [],
  }

  scrollWrapper = null
  scroller = null

  linkify (inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3

    // URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">[$1]</a>')

    // URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^/])(www\.[\S]+(\b|$))/gim
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">[$2]</a>')

    // Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-_.])+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">[$1]</a>')

    return replacedText
  }

  render () {
    return (
      <div
        className={styles['question-list-wrapper']}
        ref={(ele) => { this.scrollWrapper = ele }}
      >
        <ul className={styles['question-list']}>
          {
            this.context.allQuestions.map((question, i) =>
              <li className={styles['question-list-item']}>
                <div className={styles['title']}>{i + 1}.{question.title}</div>
                <p
                  className={styles['answer']}
                  dangerouslySetInnerHTML={{
                    __html: this.linkify(question.answer.replace(/\n/g, '</br>')),
                  }}
                />
              </li>
            )
          }
        </ul>
      </div>
    )
  }

  componentDidMount () {
    if (this.scrollWrapper instanceof HTMLElement) {
      this.scroller = new BScroll(this.scrollWrapper, {
        scrollX: false,
        click: true,
      })
    }
  }

  componentWillUnmount () {
    this.scroller.destory()
  }
}
