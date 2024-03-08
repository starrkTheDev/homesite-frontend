import classes from './Inputs.module.css';
import Select from 'react-select';
import { estateOptions, purposeOptions, marketOptions } from '../../files/options';
import { useState } from 'react';
import { useLanguage } from "../../files/LanguageContext";

const SelectInputs = (
    { onEstateChange,
        onPurposeChange,
        onMarketChange, errors }) => {
    // eslint-disable-next-line
    const [estate, setEstate] = useState('');
    // eslint-disable-next-line
    const [purpose, setPurpose] = useState('');
    // eslint-disable-next-line
    const [market, setMarket] = useState('');

    const { language } = useLanguage();
    const translations = require(`../../files/${language}.json`);

    const handleChangeEstate = (selectedOption) => {
        setEstate(selectedOption.value);
        onEstateChange(selectedOption.value);
    }

    const handleChangePurpose = (selectedOption) => {
        setPurpose(selectedOption.value);
        onPurposeChange(selectedOption.value);
    };

    const handleChangeMarket = (selectedOption) => {
        setMarket(selectedOption.value);
        onMarketChange(selectedOption.value);
    };

    const translateOptions = (options) => {
        return options.map(option => ({
            ...option,
            label: translations[option.labelKey.split('.').shift()][option.labelKey.split('.').pop()]
        }));
    };

    return (
        <div>
            <Select
                required
                className={classes.select}
                options={translateOptions(estateOptions)}
                placeholder={translations.estate}
                onChange={handleChangeEstate}
                id="estate"
            />
            {estate !== "dzialki" &&
            <Select
                className={classes.select}
                options={translateOptions(purposeOptions)}
                placeholder={translations.purpose}
                onChange={handleChangePurpose}
                id="purpose"
            />
            }
            {estate !== "dzialki" &&
            <Select
                className={classes.select}
                options={translateOptions(marketOptions)}
                placeholder={translations.market}
                onChange={handleChangeMarket}
                id="market"
            />
            }
        </div>
    )
};

export default SelectInputs;