import {useRef} from "react";
import classes from './Inputs.module.css';
import { useLanguage } from "../../files/LanguageContext";

const LoginInput = ({ onEmailChange, onPasswordChange, onEnterPress }) => {

    const { language } = useLanguage();
    const translations = require(`../../files/${language}.json`);

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const inputHandler = () => {
        const enteredEmail = emailInputRef.current.value;
        onEmailChange(enteredEmail);
        const enteredPassword = passwordInputRef.current.value;
        onPasswordChange(enteredPassword);
    }

    return (
        <div className={classes.signup_container}>
             <input
                className={classes.login_input}
                type="email"
                id="email"
                required
                placeholder="E-mail"
                ref={emailInputRef}
                onChange={inputHandler}
            />
            <input
                className={classes.login_input}
                type="password"
                id="password"
                required
                placeholder={translations.password}
                ref={passwordInputRef}
                onChange={inputHandler}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onEnterPress();
                    }
                }}
            />
        </div>
    )
};

export default LoginInput;