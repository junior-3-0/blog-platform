import styles from './button.module.scss'

export function Button({ children }) {
  return (
    <button type="submit" className={styles.button}>
      {children}
    </button>
  )
}
