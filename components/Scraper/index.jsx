import React from 'react';
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
    const inputRef = React.createRef();

    const scrape = async () => {
        const url = inputRef.current.value().replace(/\?.*$/, '');

        beforeScrape();
        try {
            const {data} = await scrapeGift(url);

            afterScrape(data, url);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <Input ref={inputRef} name={'scrape'} placeholder={'Vlož odkaz'}/>
            <Button busy={fetching.has(SCRAPING_GIFT)} type={'button'} label={'Předvyplnit údaje'} onClick={scrape}/>
        </div>
    )
}

export default Scraper;