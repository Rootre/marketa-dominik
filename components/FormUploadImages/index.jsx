import React, {useEffect, useState} from 'react';
import Dropzone from 'dropzone';
import classNames from 'classnames';

import Button from 'Components/Button';

import {IMAGE_UPLOAD_URL} from 'Api/urls';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

const CONTAINER_ID = 'imageUploadZone';
const DROPZONE_SETTINGS = {
    thumbnailWidth: 100,
    thumbnailHeight: 100,
    parallelUploads: 20,
};

console.log('env:', process.env.NODE_ENV);

function FormUploadImages() {
    const [dropzone, setDropzone] = useState(null);

    useEffect(() => {
        setDropzone(new Dropzone(`#${CONTAINER_ID}`, DROPZONE_SETTINGS));
    }, []);

    return (
        <form
            action={IMAGE_UPLOAD_URL}
            className={classNames(globalStyles.wrapper, styles.wrapper)}
            enctype={'multipart/form-data'}
            id={CONTAINER_ID}
            method={'post'}
        >
            <p>Přatáhni fotky sem</p>
            <Button label={'Ulož'}/>
        </form>
    )
}

export default FormUploadImages;