// import PropTypes from 'prop-types'

import styles from '../style/TeacherBanner.sass'

import bannerImage from '../assets/banner@2x.png'

const TeacherBanner = ({ onClick }) =>
  <div class={styles['teacher-banner']} onClick={onClick}>
    <img src={bannerImage} alt='我们为你准备了所有老师的联系方式'/>
  </div>

export default TeacherBanner
