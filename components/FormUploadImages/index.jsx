import React, {useEffect, useState} from 'react';
import Dropzone from 'dropzone';
import classNames from 'classnames';

import {IMAGE_UPLOAD_URL} from 'Api/urls';
import {UPLOAD_IMAGES_DIR} from 'Consts/dirs';
import ImagePrototype from 'Prototypes/Image';

import useGlobalMap from 'Hooks/useGlobalMap';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

const CONTAINER_ID = 'imageUploadZone';
const DROPZONE_SETTINGS = {
    thumbnailWidth: 120,
    thumbnailHeight: 120,
    parallelUploads: 20,
    resizeWidth: 2000,
};

function FormUploadImages() {
    const [dropzone, setDropzone] = useState(null);
    const [, addNotification] = useGlobalMap('notifications');
    const [, addImage] = useGlobalMap('images');
    const processedImages = new Map();

    const addedFile = ({name}) => {
        console.log('addedFile');
        processedImages.set(name, {
            ...processedImages.get(name),
            url: UPLOAD_IMAGES_DIR + name,
        });
    };
    const queueComplete = async () => {
        console.log('queueComplete');
        const image = new ImagePrototype();

        [...processedImages.values()].map(async ({thumb, url}) => {
            try {
                const {newImage} = await image.create(url, thumb);

                addImage(newImage._id, newImage);
            } catch (e) {
                addNotification(e.message, 'error');
            }
        });
    };
    const thumbnailCreated = async ({name}, dataUrl) => {
        console.log('thumbnailCreated');

        processedImages.set(name, {
            ...processedImages.get(name),
            thumb: dataUrl,
        });
    };

    useEffect(() => {
        const dropzoneInstance = new Dropzone(`#${CONTAINER_ID}`, DROPZONE_SETTINGS);

        dropzoneInstance.on('addedfile', addedFile);
        dropzoneInstance.on('queuecomplete', queueComplete);
        dropzoneInstance.on('thumbnail', thumbnailCreated);

        setDropzone(dropzoneInstance);
    }, []);

    return (
        <form
            action={IMAGE_UPLOAD_URL}
            className={classNames(globalStyles.wrapper, styles.wrapper)}
            encType={'multipart/form-data'}
            id={CONTAINER_ID}
            method={'post'}
        >
            <p className={styles.label}>Přatáhni fotky sem</p>
        </form>
    )
}

export default FormUploadImages;