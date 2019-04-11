import React from 'react';
import classNames from 'classnames';

import CloseSVG from 'Svg/close.svg';

import styles from './styles.scss';
import Wysiwyg from "../Wysiwyg";
import Form from "../Form";
import Button from "../Button";

function EditContent({className = '', saveChanges, setClose, text = ''}) {
    const keyUpHandler = e => {
        if (e.keyCode === 27) {
            setClose && setClose();
        }
    };
    const submitHandler = refs => {
        const text = refs.get('text').current;

        saveChanges(text.value());
    };

    return (
        <div className={classNames(styles.wrapper, className)}>
            <Form onSubmit={submitHandler}>
                <Wysiwyg autofocus name={'text'} formattedValue={text}/>
                <Button type={'submit'} label={'Uložit'}/>
            </Form>
            <div className={styles.controls}>
                {setClose && <CloseSVG onClick={() => setClose()} className={styles.close}/>}
            </div>
        </div>
    )
}

export default EditContent;