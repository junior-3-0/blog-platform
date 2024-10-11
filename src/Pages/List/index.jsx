import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import cn from 'classnames'

import Article from '../../components/Article'
import { fetchArticles } from '../../store/article.slice'
import Error from '../Error'
import Paginations from '../../components/Paginations'
import Loader from '../../components/Loader'

import styles from './list.module.scss'

export default function List() {
  const { data, loading, articlesErrorMessage } = useSelector((state) => state.articles)
  const dispatch = useDispatch()

  const elements = data.articles && data.articles.map((article) => <Article key={article.slug} {...article} />)

  useEffect(() => {
    dispatch(fetchArticles({ offset: 0 }))
  }, [])

  return (
    <>
      <section className={styles.list}>
        <div
          className={cn(styles.container, {
            [styles.loading]: loading || articlesErrorMessage,
          })}
        >
          {loading && <Loader />}
          {articlesErrorMessage && loading && <Error err={articlesErrorMessage} />}
          {elements}
        </div>
      </section>
      <Paginations total={data?.articlesCount} />
    </>
  )
}
