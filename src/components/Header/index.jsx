import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { UserLogIn } from '../UserLogIn'
import { UserLogOut } from '../UserLogOut'

import styles from './header.module.scss'

export default function Header() {
  const jwt = useSelector((state) => state.signup.user.user?.token)

  return (
    <section className={styles.header}>
      <Link to="/" className={styles.logo}>
        Realworld Blog
      </Link>
      {jwt ? <UserLogIn /> : <UserLogOut />}
    </section>
  )
}
