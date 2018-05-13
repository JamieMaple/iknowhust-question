import styles from '../style/TeacherDetail.sass'

const defaultHolder = '未知'

const TeacherDetailBox = ({name, school, title, telephone, email, office}) => (
  <div className={styles['root']}>
    <p>姓名: {name || defaultHolder}</p>
    <p>所在学院: {school || defaultHolder}</p>
    <p>职称: {title || defaultHolder}</p>
    <p>电话: {telephone || defaultHolder}</p>
    <p>邮箱: {email || defaultHolder}</p>
    <p>办公室: {office || defaultHolder}</p>
  </div>
)

export default TeacherDetailBox
