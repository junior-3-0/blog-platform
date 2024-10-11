import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '../../components/Button'
import { TitleForm } from '../../components/TitleForm'
import { loginFetch } from '../../store/signup.slice'
import Input from '../../components/Input'
import { validateEmail, validateRequired } from '../../helpers/validateObj'

import styles from './signin.module.scss'

export function SignIn() {
  const dispatch = useDispatch()
  const { errorMessageLogin } = useSelector((state) => state.signup)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <div className={styles.signin}>
      <form className={styles.form} onSubmit={handleSubmit((data) => dispatch(loginFetch(data)))}>
        <TitleForm>Sign In</TitleForm>
        {errorMessageLogin && <div className={styles.serverError}>{errorMessageLogin}</div>}
        <div className={styles.inputs}>
          <Input
            register={register}
            errors={errors}
            name="email"
            placeholder="Email address"
            type="email"
            validate={validateEmail}
          >
            Email address
          </Input>
          <Input
            register={register}
            errors={errors}
            name="password"
            placeholder="Password"
            type="password"
            validate={validateRequired}
          >
            Password
          </Input>
        </div>
        <Button>Login</Button>
        <div className={styles.descr}>
          Don’t have an account?{' '}
          <Link to="/sign-up" className={styles.link}>
            Sign Up.
          </Link>
        </div>
      </form>
    </div>
  )
}
