import {useRef} from "react";
import classes from './Inputs.module.css';
import { useLanguage } from "../../files/LanguageContext";

const SignUpInput = ({onEmailChange, onPasswordChange, onNameChange, onEnterPress}) => {

    const { language } = useLanguage();
    const translations = require(`../../files/${language}.json`);

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const nameInputRef = useRef();

    const inputHandler = () => {
        const enteredEmail = emailInputRef.current.value;
        onEmailChange(enteredEmail);
        const enteredPassword = passwordInputRef.current.value;
        onPasswordChange(enteredPassword);
        const enteredName = nameInputRef.current.value;
        onNameChange(enteredName);
    }

    return (
        <div className={classes.signup_container}>
            <input
                className={classes.signup_input}
                type="email"
                id="email"
                required
                placeholder="E-mail"
                ref={emailInputRef}
                onChange={inputHandler}
            />
            <input
                className={classes.signup_input}
                type="text"
                id="name"
                required
                placeholder={translations.name}
                ref={nameInputRef}
                onChange={inputHandler}
            />
            <input
                className={classes.signup_input}
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

export default SignUpInput;