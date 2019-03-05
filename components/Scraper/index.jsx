import React, {useState} from 'react';
import classNames from 'classnames';

import Input from 'Components/Input';
import Button from 'Components/Button';

import {scrapeGift} from 'Api/client';
import {SCRAPING_GIFT} from 'Consts/fetching';
import useGlobalMap from 'Hooks/useGlobalMap';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function Scraper({afterScrape, beforeScrape}) {
    const [fetching] = useGlobalMap('fetching');
    const [, addNotification] = useGlobalMap('notifications');
    const [inputValue, setInputValue] = useState('');

    const inputChange = (name, value) => {
        setInputValue(value);
    };
    const scrape = async () => {
        const url = inputValue.replace(/\?.*$/, '');
        let data;

        beforeScrape();

        try {
            const result = await scrapeGift(url);
            data = result.data;

            setInputValue('');
        } catch (e) {
            addNotification(e.message, 'error');
        }

        afterScrape(data, url);
    };

    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <Input onChange={inputChange} value={inputValue} name={'scrape'} placeholder={'Vlož odkaz'}/>
            <Button busy={fetching.has(SCRAPING_GIFT)} type={'button'} label={'Pokračovat'} onClick={scrape}/>
        </div>
    )
}

export default Scraper;