import styles from '../style/TeacherDetail.sass'

const TeacherDetailBox = (props) => (
  <div className={styles['root']}>
    <p>姓名: 张林</p>
    <p>所在学院: 人文学院</p>
    <p>职称: 教授</p>
    <p>电话: 15172566823</p>
    <p>邮箱: zhangling@hust.edu.cn</p>
    <p>办公室: 南一楼</p>
  </div>
)

export default TeacherDetailBox
