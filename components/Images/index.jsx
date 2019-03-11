import React, {useState} from 'react';
import {useGlobal} from 'reactn';
import classNames from 'classnames';

import Spinner from 'Components/Spinner';

import CloseSVG from 'Svg/close.svg';

import ImagePrototype from 'Prototypes/Image';

import useGlobalMap from 'Hooks/useGlobalMap';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function Images() {
    const [images, , deleteImage] = useGlobalMap('images');
    const [isLogged] = useGlobal('isLogged');
    const [, addNotification] = useGlobal('notifications');
    const [fetching, setFetching] = useState(false);

    const removeImage = async id => {
        if (!confirm('Opravdu smazat?')) {
            return;
        }

        const imageModel = new ImagePrototype();

        setFetching(true);

        try {
            await imageModel.deleteOne(id);

            deleteImage(id);
        } catch (e) {
            console.log(e);
            //addNotification(e.message, 'error');
        }

        setFetching(false);
    };

    if (images.size === 0) {
        return null;
    }

    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <h2 className={globalStyles.heading}>Fotogalerie</h2>
            {[...images.values()].map(({_id, url}) => (
                <div key={_id} className={styles.item}>
                    <a href={url}>
                        <img className={styles.thumb} src={url} alt={''}/>
                    </a>
                    {isLogged
                        ? fetching
                            ? (
                                <Spinner/>
                            )
                            : (
                                <span className={styles.delete} onClick={() => removeImage(_id)}>
                                    <CloseSVG/>
                                </span>
                            )
                        : ''
                    }
                </div>
            ))}
        </div>
    )
}

export default Images;