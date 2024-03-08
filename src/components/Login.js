import classes from "./Login.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoginInput from "./inputs/LoginInput";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "../files/LanguageContext";

const Login = () => {

    const { language } = useLanguage();
    const translations = require(`../files/${language}.json`);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();

    const loginHandler = (event) => {
        event.preventDefault();
        setLoading(true);

        const graphqlQuery = {
            query: `
                mutation Login($email: String!, $password: String!) {
                    login(email: $email, password: $password) {
                        token
                        userId
                    }
                }
            `,
            variables: {
                email: email,
                password: password
            }
        };

        fetch('https://homesite-api.onrender.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            },
            body: JSON.stringify(graphqlQuery)
        })
        .then(response => response.json())
        .then(data => {
            if (data.errors) {
                setErrors(data.errors);
                setLoading(false);
                return;
            } else {
                setErrors([]);
                setCompleted(true);
                setLoading(false);

                const token = data.data.login.token;

                localStorage.setItem('token', token);
                localStorage.setItem('userId', data.data.login.userId);


                setTimeout(() => {
                    navigate('/');
                    window.location.reload();
                }, 3000);;
            }
            console.log(data);
        })
    };

    const handleEnterPress = () => {
        loginHandler({ preventDefault: () => {} }); 
    };

    return (
        <div className={classes.login_background}>
               {errors.length > 0 && (
                <div className={classes.error_container}>
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error.message}</li>
                        ))}
                    </ul>
                </div>
            )}
            {loading &&
                <p className={classes.loading}>{translations.loading}</p>
            }
            {completed &&
                <div className={classes.completed_container}>
                    <ul>
                        <li>{translations.successfullLogin}</li>
                    </ul>
                </div>
            }
            <div className={classes.login_form}>
                <LoginInput
                    onEmailChange={setEmail}
                    onPasswordChange={setPassword}
                    onEnterPress={handleEnterPress}
                />
                <button className={classes.button} 
                    onClick={loginHandler} > 
                    {translations.login}
                </button>
                <h4>{translations.noAccount}</h4>
                <Link 
                    to="/signup"
                    className={classes.button}>
                {translations.signup}
                </Link>
            </div>
        </div>
    )
};

export default Login;