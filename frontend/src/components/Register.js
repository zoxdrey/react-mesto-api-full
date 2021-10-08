import React, {useState} from "react";
import {Link} from "react-router-dom";

export const Register = ({onSubmit}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleEmailChange(e) {
        setEmail(e.target.value);

    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({email, password})
    }

    return (
        <div className={`authorization`}>
            <form className={`authorization-form`} name={`form`} noValidate onSubmit={(e) => {
                handleSubmit(e)
            }}>
                <h2 className="authorization-form__title">Регистрация</h2>
                <input
                    className="authorization-form__input"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={handleEmailChange}
                />
                <span className="authorization-form__error"/>
                <input
                    type='password'
                    className="authorization-form__input"
                    id="password"
                    maxLength="20"
                    minLength="2"
                    name="password"
                    placeholder="Пароль"
                    required
                    value={password} onChange={handlePasswordChange}
                />
                <span className="authorization-form__error"/>
                <button
                    aria-label="Save"
                    className={`authorization-form__button`}
                    type="submit"
                >
                    Зарегистрироваться
                </button>
                <div className={'authorization-form__footer'}>
                    <p className={'authorization-form__footer-text'}>Уже зарегистрированы?</p>
                    <Link className={'authorization-form__footer-link'} to={'/sign-in'}>Войти</Link>
                </div>
            </form>
        </div>)
}