import React, {useEffect, useState} from 'react';
import classNames from 'classnames';

import Button from 'Components/Button';
import Input from 'Components/Input';
import Scraper from 'Components/Scraper';

import {SAVING_GIFT, SCRAPING_GIFT} from 'Consts/fetching';
import {scrapeImage, scrapeTitle} from 'Helpers/scraper';
import useGlobalMap from 'Hooks/useGlobalMap';
import GiftPrototype from 'Prototypes/Gift';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function AdminGifts() {
    const [fetching, addFetching, deleteFetching] = useGlobalMap('fetching');
    const [, addNotification] = useGlobalMap('notifications');
    const [showForm, setShowForm] = useState(true);
    const [gifts, setGifts] = useState([]);
    const [values, setValues] = useState({image: '', name: '', url: ''});

    const afterScrape = (data, url) => {
        setValues({
            image: scrapeImage(data),
            name: scrapeTitle(data),
            url,
        });

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
    const inputChange = (name, value) => {
        setValues({...values, [name]: value});
    };
    const saveGift = async () => {
        const gift = new GiftPrototype();
        gift.setImage(values.image);
        gift.setName(values.name);
        gift.setUrl(values.url);

        addFetching(SAVING_GIFT);
        try {
            const {newGift} = await gift.create();

            setValues({
                image: '',
                name: '',
                url: '',
            });

            setGifts(gifts.concat(newGift));
        } catch (e) {
            addNotification(e.message);
        }
        deleteFetching(SAVING_GIFT);
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
                        <Input onChange={inputChange} label={'Name'} value={values.name} name={'name'}/>
                        <Input onChange={inputChange} label={'Image URL'} value={values.image} name={'image'}/>
                        <Input onChange={inputChange} label={'URL'} value={values.url} name={'url'}/>
                        <Button busy={fetching.has(SAVING_GIFT)} label={'Ulož'} type={'button'} onClick={saveGift}/>
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