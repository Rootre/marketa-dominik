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
};

function FormUploadImages() {
    const [dropzone, setDropzone] = useState(null);
    const [, addNotification] = useGlobalMap('notifications');
    const [, addImage] = useGlobalMap('images');
    const uploadedImages = [];

    useEffect(() => {
        const dropzoneInstance = new Dropzone(`#${CONTAINER_ID}`, DROPZONE_SETTINGS);

        dropzoneInstance.on('addedfile', ({name}) => uploadedImages.push(UPLOAD_IMAGES_DIR + name));
        dropzoneInstance.on('queuecomplete', async () => {
            const image = new ImagePrototype();

            uploadedImages.map(async url => {
                try {
                    const {newImage} = await image.create(url);

                    addImage(newImage._id, newImage);
                } catch (e) {
                    addNotification(e.message, 'error');
                }
            });
        });

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