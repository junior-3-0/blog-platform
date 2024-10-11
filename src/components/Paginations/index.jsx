import { useEffect, useRef } from 'react'
import { Pagination } from 'antd'
import { useDispatch } from 'react-redux'

import { fetchArticles } from '../../store/article.slice'

export default function Paginations({ total }) {
  const controllerRef = useRef()
  const dispatch = useDispatch()

  const onChange = (payload) => {
    if (controllerRef.current) {
      controllerRef.current.abort()
    }
    controllerRef.current = new AbortController()
    const { signal } = controllerRef.current
    dispatch(fetchArticles({ offset: (payload - 1) * 5, signal }))
  }

  useEffect(() => localStorage.removeItem('curr'), [])

  return (
    <Pagination
      style={{ marginTop: '2.7rem' }}
      align="center"
      showSizeChanger={false}
      pageSize={5}
      total={total}
      onChange={(e) => onChange(e)}
    />
  )
}
