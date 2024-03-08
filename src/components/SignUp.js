import classes from "./SignUp.module.css";
import { useState } from "react";
import SignUpInput from "./inputs/SignUpInput";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "../files/LanguageContext";

const SignUp = (props) => {

    const { language } = useLanguage();
    const translations = require(`../files/${language}.json`);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();

    const signUpHandler = (event) => {
        event.preventDefault();
        setLoading(true);

        const graphqlQuery = {
            query: `
                mutation createUser($userInput: UserInputData) {
                    createUser(userInput: $userInput) {
                        _id
                        email
                        name
                        password
                    }
                }
            `,
            variables: {
                userInput: {
                    email: email,
                    name: name,
                    password: password
                }
            }
        };

        fetch('https://homesite-api.onrender.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
                setTimeout(() => {
                    navigate('/');
                    window.location.reload();
                }, 3000);;
            }
            console.log(data);
        })
    }

    const handleEnterPress = () => {
        signUpHandler({ preventDefault: () => {} }); 
    };

    return (
        <div className={classes.signup_background}>
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
                        <li>{translations.successfullSignup}</li>
                    </ul>
                </div>
            }
            <div className={classes.signup_form}>
                <SignUpInput
                    onEmailChange={setEmail}
                    onPasswordChange={setPassword}
                    onNameChange={setName}
                    onEnterPress={handleEnterPress}
                />
                <button className={classes.button} onClick={signUpHandler}>
                    {translations.signup}
                </button>
            </div>
        </div>
    )
};

export default SignUp;