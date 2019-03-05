import React, {useEffect, useState} from 'react';
import classNames from 'classnames';

import Button from 'Components/Button';
import Input from 'Components/Input';
import Scraper from 'Components/Scraper';
import ChainBrokenSVG from 'Svg/chain-broken.svg';
import CloseSVG from 'Svg/close.svg';

import {SAVING_GIFT, SCRAPING_GIFT} from 'Consts/fetching';
import {scrapeImage, scrapeTitle} from 'Helpers/scraper';
import useGlobalMap from 'Hooks/useGlobalMap';
import GiftPrototype from 'Prototypes/Gift';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function AdminGifts() {
    const [fetching, addFetching, deleteFetching] = useGlobalMap('fetching');
    const [, addNotification] = useGlobalMap('notifications');
    const [formStep, setFormStep] = useState(0);
    const [gifts, setGifts] = useState([]);
    const [values, setValues] = useState({image: '', name: '', url: ''});

    const afterScrape = (data, url) => {
        deleteFetching(SCRAPING_GIFT);

        if (!data) {
            return;
        }

        setValues({
            image: scrapeImage(data),
            name: scrapeTitle(data),
            url,
        });

        setFormStep(2);
    };
    const beforeScrape = () => {
        addFetching(SCRAPING_GIFT);
    };
    const cancelReservation = async id => {
        if (!confirm('Opravdu chcete zrušit rezervaci neznámého vojína?')) {
            return;
        }

        const gift = new GiftPrototype();

        try {
            await gift.edit(id, {
                reserved: false,
            });

            setGifts(gifts.map(gift => gift._id === id
                ? ({
                    ...gift,
                    reserved: false,
                })
                : gift)
            )
        } catch (e) {
            addFetching(e.message, 'error');
        }
    };
    const deleteGift = async id => {
        if (!confirm('Opravdu smazat?')) {
            return;
        }

        const gift = new GiftPrototype();

        try {
            await gift.deleteOne(id);

            setGifts(gifts.filter(({_id}) => _id !== id));
        } catch (e) {
            addNotification(e.message, 'error');
        }
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
            addNotification('Uloženo!', 'success');
            setFormStep(1);
        } catch (e) {
            addNotification(e.message, 'error');
        }
        deleteFetching(SAVING_GIFT);
    };

    useEffect(() => {
        fetchGifts();
    }, []);

    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <h2>Správa darů</h2>

            {formStep === 0
                ? (
                    <span className={styles.new} onClick={() => setFormStep(1)}>
                        <CloseSVG className={styles.add}/> Přidat dar
                    </span>
                )
                : (
                    <div className={styles.newGiftWrapper}>
                        <CloseSVG className={styles.close} onClick={() => setFormStep(0)}/>
                        {formStep === 1
                            ? (
                                <Scraper beforeScrape={beforeScrape} afterScrape={afterScrape}/>
                            )
                            : (
                                <>
                                    <Input onChange={inputChange} label={'Jméno'} value={values.name} name={'name'}/>
                                    <Input onChange={inputChange} label={'Odkaz na obrázek'} value={values.image}
                                           name={'image'}/>
                                    <Input onChange={inputChange} label={'Odkaz'} value={values.url} name={'url'}/>
                                    <Button busy={fetching.has(SAVING_GIFT)} label={'Vlož dar'} type={'button'}
                                            onClick={saveGift}/>
                                </>
                            )
                        }
                    </div>
                )
            }

            <ul>
                {gifts.map(({_id, name, url, reserved}) => (
                    <li key={_id}>
                        <a
                            href={url}
                            target={'_blank'}
                            title={reserved ? 'Rezervováno' : ''}
                            className={classNames(styles.name, {
                                [styles.reserved]: reserved,
                            })}
                        >{name}</a>
                        {reserved && (
                            <span title={'Zrušit rezervaci'}
                                  className={styles.cancelReservation}
                                  onClick={() => cancelReservation(_id)}>
                                <ChainBrokenSVG/>
                            </span>
                        )}
                        <span className={styles.delete} title={'Smazat'} onClick={() => deleteGift(_id)}>
                            <CloseSVG/>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AdminGifts;