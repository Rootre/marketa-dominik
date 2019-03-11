import React, {useEffect, useState} from 'react';
import Dropzone from 'dropzone';
import classNames from 'classnames';

import {IMAGE_UPLOAD_URL} from 'Api/urls';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

const CONTAINER_ID = 'imageUploadZone';
const DROPZONE_SETTINGS = {
    thumbnailWidth: 100,
    thumbnailHeight: 100,
    parallelUploads: 20,
};

function FormUploadImages() {
    const [dropzone, setDropzone] = useState(null);

    useEffect(() => {
        setDropzone(new Dropzone(`#${CONTAINER_ID}`, DROPZONE_SETTINGS));
    }, []);

    return (
        <form
            action={IMAGE_UPLOAD_URL}
            className={classNames(globalStyles.wrapper, styles.wrapper)}
            encType={'multipart/form-data'}
            id={CONTAINER_ID}
            method={'post'}
        >
            <p>Přatáhni fotky sem</p>
        </form>
    )
}

export default FormUploadImages;