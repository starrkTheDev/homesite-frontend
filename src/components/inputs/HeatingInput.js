import { heatingOptions } from '../../files/options';
import classes from './Inputs.module.css';
import Select from 'react-select';
import { useState } from 'react';
import { useLanguage } from "../../files/LanguageContext";

const HeatingInput = ({ onHeatingChange }) => {

    const { language } = useLanguage();
    const translations = require(`../../files/${language}.json`);

    // eslint-disable-next-line
    const [heating, setHeating] = useState('');

    const handleChangeHeating = (selectedOption) => {
        setHeating(selectedOption.value);
        onHeatingChange(selectedOption.value);
    };

    const translateOptions = (options) => {
        return options.map(option => ({
            ...option,
            label: translations[option.labelKey.split('.').shift()][option.labelKey.split('.').pop()]
        }));
    };

    return (
        <Select
            className={classes.select}
            options={translateOptions(heatingOptions)}
            placeholder={translations.heating}
            onChange={handleChangeHeating}
            id="heating"
            name='heating'
        />
    )
};

export default HeatingInput;