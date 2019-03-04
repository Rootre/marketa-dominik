import React from 'react';
import classNames from 'classnames';
import {getJSON as getCookie, set as setCookie} from 'js-cookie';

import Spinner from 'Components/Spinner';

import GiftPrototype from 'Prototypes/Gift';

import {name as cookieName} from 'Consts/gifts/cookie';

import styles from './styles.scss';
import useGlobalMap from "../../hooks/useGlobalMap";

function Gift({gift: {_id: id, image, name, reserved, url}}) {
    const [fetching, addFetching, deleteFetching] = useGlobalMap('fetching');
    const [gifts, addGift] = useGlobalMap('gifts');
    const cookie = getCookie(cookieName);
    let list = cookie ? cookie.list : [];

    const canDeleteReservation = reserved && list.indexOf(id) >= 0;

    const reserve = async () => {
        const gift = new GiftPrototype();

        if (reserved && !canDeleteReservation) {
            return;
        }

        addFetching(id);

        try {
            await gift.edit(id, {
                reserved: !reserved,
            });

            if (reserved) {
                list = list.filter(item => item !== id);
            } else  {
                list.push(id);
            }

            setCookie(cookieName, {
                list,
            }, {expires: 60});

            addGift(id, {
                ...gifts.get(id),
                reserved: !reserved,
            })
        } catch (e) {
            console.error(e);
        }

        deleteFetching(id);
    };

    return (
        <div className={classNames(styles.wrapper, {
            [styles.withImage]: !!image,
            [styles.reserved]: reserved,
            [styles.myReservation]: canDeleteReservation,
        })}>
            <a href={url} className={styles.name} target={'_blank'}>
                {image && <img src={image} alt={name} className={styles.image}/>}
                {name}
            </a>
            <em className={styles.status} onClick={reserve}>
                {fetching.has(id)
                    ? <Spinner/>
                    : reserved
                        ? canDeleteReservation
                            ? 'zrušit rezervaci'
                            : 'rezervováno'
                        : 'rezervovat'
                }
            </em>
        </div>
    )
}

export default Gift;