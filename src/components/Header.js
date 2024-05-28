import classes from './Header.module.css';
import React from "react";
import LoginButton from './buttons/LoginButton';
import AddButton from './buttons/AddButton';
import { useState } from 'react';
import SearchButton from './buttons/SearchButton';
import LogoutButton from './buttons/LogoutButton';
import MyPostsButton from './buttons/MyPostsButton';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../files/LanguageContext';
import Bars from './buttons/Bars';

const Header = () => {

    const [isAddForm, setIsAddForm] = useState(false);
    const { switchLanguage, language } = useLanguage();
    const [modal, setModal] = useState(false);

    const handleLanguageSwitch = (newLanguage) => {
        switchLanguage(newLanguage);
    };

    const modalHandler = () => {
        setModal(true);
        if(modal) {
            setModal(false);
        }
    }

    const modalDisabler = () => {
        setModal(false);
    }
    
    const secondPageEnable = () => {
        if (!isAddForm) {
            setIsAddForm(true);
        } else {
            setIsAddForm(false);
        }
    }

    const navigate = useNavigate();


    const token = localStorage.getItem('token');

    return (
        <div>
            <div className={classes.header}>
                <div className={classes.wrapper}>
                    <div className={classes.firstLine}>
                        <div onClick={() => navigate('/')}
                            className={classes.name}>
                                zamieszkaj.pl
                        </div>
                        <div className={classes.languageContainer}>
                            {language === "pl" && (
                            <button onClick={() => handleLanguageSwitch("en")}>
                                <img
                                    src="https://flagcdn.com/gb.svg" 
                                    alt="GB Flag"
                                    className={classes.flagIcon}
                                />
                            </button>
                            )}
                            {language === "en" && (
                            <button onClick={() => handleLanguageSwitch("pl")}>
                                <img
                                    src="https://flagcdn.com/pl.svg" 
                                    alt="PL Flag"
                                    className={classes.flagIcon}
                                />
                            </button>
                            )}
                        </div>
                    </div>
                    {!isAddForm && <AddButton
                        onOptionsClick={secondPageEnable}
                        isAddForm={isAddForm}
                    />}
                    {isAddForm && <SearchButton
                        onOptionsClick={secondPageEnable}
                        isAddForm={isAddForm}
                    />}
                    {!token && <LoginButton />}
                    {token &&<Bars onModalActivation={modalHandler}/>}
                </div>
            </div>
            {modal && 
            <div className={classes.modal_container}>
                <div onClick={modalDisabler} className={classes.background}></div>
                <div className={classes.modal}>
                    <MyPostsButton/>
                    <LogoutButton/>
                </div>
            </div>}
        </div>
    )
};

export default Header;
