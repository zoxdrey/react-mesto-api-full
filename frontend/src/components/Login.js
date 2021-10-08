import React, {useState} from "react";

export const Login = ({onSubmit}) => {

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
                <h2 className="authorization-form__title">Вход</h2>
                <input
                    className="authorization-form__input"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={email || ''}
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
                    value={password || ''}
                    onChange={handlePasswordChange}
                />
                <span className="authorization-form__error"/>
                <button
                    aria-label="Save"
                    className={`authorization-form__button`}
                    type="submit"
                >
                    Вход
                </button>
            </form>
        </div>
    )
}