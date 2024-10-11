import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Header from '../components/Header'
import { reloadFetch } from '../store/signup.slice'
import { getToken } from '../helpers/getJwtLocalStorage'

import styles from './layout.module.scss'

export default function Layout() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (getToken()) {
      dispatch(reloadFetch())
    }
  }, [])

  return (
    <div className={styles.root}>
      <Header />
      <Outlet />
    </div>
  )
}
