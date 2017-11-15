import PropTypes from 'prop-types'
// import Component from 'inferno-component'
// import Scroll from 'iscroll'

import styles from '../style/TextList.sass'

// export default class TabHeader extends Component {
//   static propTypes = {
//     listItems: PropTypes.array.isRequired,
//   }

//   static defaultProps = {
//     listItems: [],
//   }

//   listWrapper = null

//   render () {
//     return (
//       <div
//         className={styles['text-list-wrapper']}
//         // ref={ele => {
//         //  if (ele instanceof HTMLElement) { this.listWrapper = ele }
//         // }}
//       >
//         <ul className={styles['text-list']}>
//           {
//             this.props.listItems.map((item, i) =>
//               <li className={styles['list-item']}>{i + 1}. {item}</li>
//             )
//           }
//         </ul>
//       </div>
//     )
//   }

//   // componentDidMount () {
//   //   const myScroll = new Scroll(this.listWrapper, {
//   //     scrollbars: true,
//   //     preventDefault: false,
//   //     disablePointer: true, // important to disable the pointer events that causes the issues
//   //     disableTouch: false, // false if you want the slider to be usable with touch devices
//   //     disableMouse: false, // false if you want the slider to be usable with a mouse (desktop)      
//   //   })
//   //   console.log(myScroll)
//   // }
// }

const TextList = props =>
  <ul className={styles['text-list']}>
    {
      props.listItems.map((item, i) =>
        <li className={styles['list-item']}>{i + 1}. {item}</li>
      )
    }
  </ul>

TextList.propTypes = {
  listItems: PropTypes.array.isRequired,
}

TextList.defaultProps = {
  listItems: [],
}

export default TextList
