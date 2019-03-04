import React, {useEffect, useState} from 'react';
import classNames from 'classnames';

import Button from 'Components/Button';
import Form from 'Components/Form';
import Input from 'Components/Input';

import GiftPrototype from 'Prototypes/Gift';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';
import Scraper from "../../Scraper";

function AdminGifts() {
    const [showForm, setShowForm] = useState(true);
    const [gifts, setGifts] = useState([]);

    const afterScrape = (data) => {
        console.log('afterScrape', data);
    };
    const fetchGifts = async () => {
        const gift = new GiftPrototype();
        const gifts = await gift.fetchAll();

        setGifts(gifts);
    };

    useEffect(() => {
        fetchGifts();
    }, []);

    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <p>AdminGifts Component</p>

            {showForm
                ? (
                    <Scraper callback={afterScrape}/>
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