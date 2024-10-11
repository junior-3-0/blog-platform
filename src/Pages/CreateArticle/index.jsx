import { useSelector } from 'react-redux'
import { Alert } from 'antd'

import { FormArticle } from '../../components/FormArticle'
import { createFetch } from '../../store/createArticle.slice'

import styles from './createArticle.module.scss'

export function CreateArticle() {
  const { errorCreateMessage } = useSelector((state) => state.createArticle)
  return (
    <div className={styles.wrap}>
      {errorCreateMessage && (
        <div className={styles.error}>
          <Alert message={errorCreateMessage} type="error" />;
        </div>
      )}
      <FormArticle fn={createFetch} />
    </div>
  )
}
