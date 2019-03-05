import React, {useEffect, useState} from 'react';
import classNames from 'classnames';

import Button from 'Components/Button';
import Input from 'Components/Input';
import Scraper from 'Components/Scraper';

import {SCRAPING_GIFT} from 'Consts/fetching';
import {scrapeImage, scrapeTitle} from 'Helpers/scraper';
import useGlobalMap from 'Hooks/useGlobalMap';
import GiftPrototype from 'Prototypes/Gift';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function AdminGifts() {
    const [, addFetching, deleteFetching] = useGlobalMap('fetching');
    const [showForm, setShowForm] = useState(true);
    const [scrapedImage, setScrapedImage] = useState('');
    const [scrapedTitle, setScrapedTitle] = useState('');
    const [scrapedUrl, setScrapedUrl] = useState('');
    const [gifts, setGifts] = useState([]);

    const afterScrape = (data, url) => {
        setScrapedImage(scrapeImage(data));
        setScrapedTitle(scrapeTitle(data));
        setScrapedUrl(url);

        deleteFetching(SCRAPING_GIFT);
    };
    const beforeScrape = () => {
        addFetching(SCRAPING_GIFT);
    };
    const fetchGifts = async () => {
        const gift = new GiftPrototype();
        const gifts = await gift.fetchAll();

        setGifts(gifts);
    };
    const saveGift = async () => {
        console.log('saveGift');
    };

    useEffect(() => {
        fetchGifts();
    }, []);

    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <p>AdminGifts Component</p>

            {showForm
                ? (
                    <div>
                        <Scraper beforeScrape={beforeScrape} afterScrape={afterScrape}/>
                        <Input label={'Name'} value={scrapedTitle} name={'name'}/>
                        <Input label={'Image URL'} value={scrapedImage} name={'image'}/>
                        <Input label={'URL'} value={scrapedUrl} name={'url'}/>
                        <Button label={'Ulož'} type={'button'} onClick={saveGift}/>
                    </div>
                )
                : (
                    <span onClick={() => setShowForm(true)}>nový</span>
                )
            }

            <ul>
                {gifts.map(({_id, name}) => (
                    <li key={_id}>{name}</li>
                ))}
            </ul>
        </div>
    )
}

export default AdminGifts;