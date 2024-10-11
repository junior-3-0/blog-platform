import { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import cn from 'classnames'

import Article from '../../components/Article'
import Loader from '../../components/Loader'

import styles from './slug.module.scss'

export default function Slug() {
  const data = useLoaderData()

  return (
    <div className={cn(styles.container, styles.err)}>
      <Suspense fallback={<Loader />}>
        <Await resolve={data.data}>
          {({ data: dataArticle }) => <Article {...dataArticle.article}>{dataArticle.article.body}</Article>}
        </Await>
      </Suspense>
    </div>
  )
}
