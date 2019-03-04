import React from 'react';
import classNames from 'classnames';
import fetch from 'cross-fetch';

import Input from 'Components/Input';
import Button from 'Components/Button';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function Scraper({callback}) {
    const inputRef = React.createRef();

    const scrape = async () => {
        const url = inputRef.current.value().replace(/^https?:\/\//g, 'http://');

        const corsUrl = `http://anyorigin.com/go?url=${encodeURIComponent(url)}`;

        const result = await fetch(corsUrl, {
            mode: 'cors',
        });

        callback(await result.text());
    };

    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <Input ref={inputRef} name={'scrape'} placeholder={'Vlož odkaz'}/>
            <Button type={'button'} label={'Předvyplnit údaje'} onClick={() => scrape()}/>
        </div>
    )
}

export default Scraper;