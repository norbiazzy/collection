import s from './Sing.module.css'
import {NavLink, useNavigate} from "react-router-dom";
import {Form, Field} from 'react-final-form'
import {hideErrMessageAC, registerAC, registrationThunk, showErrMessageAC} from "../redux/authReducer";
import InputForm from "../all/InputForm";
import {connect} from "react-redux";
import React, {useEffect} from "react";
import AuthDataHOC from "../hoc/AuthDataHOC";
import {compose} from "redux";


const Registration = (props) => {
  const navigate = useNavigate()
  useEffect(() => props.iToken ? navigate('/profile') : null)
  let onSubmit = async values => {
    props.hideErrMessageAC()
    const body = {
      ...values,
      role: values.role ? 'admin' : 'user',
    }
    props.registrationThunk(body)
  }
  const required = value => (value ? undefined : true)
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Registration</h1>
      {props.errorMessage ? (<div className={s.errorMessage}>
        {props.errorMessage}
      </div>) : null}
      <Form
        onSubmit={onSubmit}
        validate={required}
        render={({handleSubmit}) => (
          <form onSubmit={handleSubmit}>
            <div>
              <InputForm name={"email"} type={"text"} required={required} nameText={"Email"}/>
            </div>
            <div>
              <InputForm name={"password"} type={"password"} required={required} nameText={"Password"}/>
            </div>
            <div>
              <Field name="role" type={'checkbox'} render={
                ({input}) => (
                  <label className={'d-flex py-2 align-items-center'}>
                    <span className={'pe-2'}>Admin</span>
                    <input {...input}/>
                  </label>
                )
              }/>
            </div>
            <button className={'btn btn-dark w-100'} type="submit">Sing Up</button>
          </form>
        )}
      />
      <div className='d-flex justify-content-between'>
        <p>You have account?</p> <NavLink to={'/login'} className='link-dark'>Sing In</NavLink>
      </div>
      <NavLink to={'/'}>Go to main</NavLink>
    </div>
  )
}

const mapStateToProps = (state) => ({
  errorMessage: state.auth.errorMessage
})
export default compose(
  AuthDataHOC,
  connect(mapStateToProps, {
    registerAC,
    registrationThunk,
    showErrMessageAC,
    hideErrMessageAC,
  })
)(Registration)

