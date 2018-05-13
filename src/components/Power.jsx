import styles from '../style/Power.sass'

export default function Power () {
  return (
    <div className={styles['power']}>
      <div className={styles['wrapper']}>
        <img style={{ height: '0.8rem' }} src={require('../assets/power.png')} />
      </div>
    </div>
  )
}
