import { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'

import { FormArticle } from '../../components/FormArticle'
import Loader from '../../components/Loader'
import { editFetch } from '../../store/editArticle.slice'

import styles from './editArticle.module.scss'

export function EditArticle() {
  const data = useLoaderData()

  return (
    <div className={styles.wrap}>
      <Suspense fallback={<Loader />}>
        <Await resolve={data.data}>{({ data: dataSlug }) => <FormArticle {...dataSlug} fn={editFetch} />}</Await>
      </Suspense>
    </div>
  )
}
