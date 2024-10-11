/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import cn from 'classnames'

import { Button } from '../../components/Button'
import { TitleForm } from '../../components/TitleForm'
import { signupFetch } from '../../store/signup.slice'
import {
  validateEmail,
  validatePasswordRequired,
  validateRepeatPassword,
  validateRequired,
  validateUsername,
} from '../../helpers/validateObj'
import Input from '../../components/Input'

import styles from './signup.module.scss'

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()
  const { errorMessageSignup } = useSelector((state) => state.signup)

  return (
    <div className={styles.signup}>
      <form
        className={styles.form}
        onSubmit={handleSubmit((data) => {
          data.email = data.email.toLowerCase()
          dispatch(signupFetch(data))
        })}
      >
        <TitleForm>Create new account</TitleForm>
        {errorMessageSignup && <div className={styles.serverError}>{errorMessageSignup}</div>}
        <div className={styles.inputs}>
          <Input
            register={register}
            errors={errors}
            name="username"
            placeholder="Username"
            type="text"
            validate={validateUsername}
          >
            {' '}
            Username
          </Input>
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
            validate={validatePasswordRequired}
          >
            Password
          </Input>
          <Input
            register={register}
            errors={errors}
            name="repeatpassword"
            placeholder="Password"
            type="password"
            validateText="Passwords must match"
            validate={validateRepeatPassword}
          >
            Repeat Password
          </Input>
        </div>
        <div className={styles.divider} />
        <div className={styles.agree}>
          <input className={styles.checkbox} id="agree" type="checkbox" {...register('agree', validateRequired)} />
          <label
            htmlFor="agree"
            className={cn(styles.label, {
              [styles.checkbox_error]: errors.agree?.message,
            })}
          >
            I agree to the processing of my personal information
          </label>
        </div>
        <div className={styles.agree_errors}>{errors.agree?.message}</div>
        <Button>Create</Button>
        <div className={styles.descr}>
          Already have an account?{' '}
          <Link to="/sign-in" className={styles.link}>
            Sign In.
          </Link>
        </div>
      </form>
    </div>
  )
}
