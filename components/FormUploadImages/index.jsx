import React, {useEffect, useState} from 'react';
import Dropzone from 'dropzone';
import classNames from 'classnames';

import {IMAGE_UPLOAD_URL} from 'Api/urls';
import {UPLOAD_IMAGES_DIR, UPLOAD_IMAGE_THUMBS_DIR} from 'Consts/dirs';
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
    let thumbNailsGenerated = 0;
    let imagesCreated = false;

    const addedFile = ({name}) => {
        console.log('addedFile');
        processedImages.set(name, {
            thumb: UPLOAD_IMAGE_THUMBS_DIR + name,
            url: UPLOAD_IMAGES_DIR + name,
        });
    };
    const createImages = async () => {
        if (imagesCreated) {
            return;
        }
        console.log('!createImages');

        imagesCreated = true;
        const image = new ImagePrototype();

        try {
            const {newImages} = await image.createMany([...processedImages.values()]);

            setTimeout(() => newImages.forEach(newImage => addImage(newImage._id, newImage)), 100);
        } catch (e) {
            addNotification(e.message, 'error');
        }
    };
    const queueComplete = async () => {
        console.log('queueComplete');

        if (thumbNailsGenerated === processedImages.size) {
            await createImages();
        }
    };
    const thumbnailCreated = async ({name}, dataUrl) => {
        console.log('thumbnailCreated');
        const image = new ImagePrototype();
        thumbNailsGenerated++;

        if (thumbNailsGenerated === processedImages.size) {
            await createImages();
        }

        try {
            await image.createThumb(dataUrl, UPLOAD_IMAGE_THUMBS_DIR + name);
        } catch (e) {
            addNotification(e.message, 'error');
        }
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