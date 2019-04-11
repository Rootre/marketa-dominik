import React from 'react';
import classNames from 'classnames';

import Button from 'Components/Button';
import Form from 'Components/Form';
import Wysiwyg from 'Components/Wysiwyg';

import styles from './styles.scss';

function EditContent({className = '', saveChanges, setClose, text = ''}) {
    const submitHandler = refs => {
        const text = refs.get('text').current;

        saveChanges(text.value());
    };

    return (
        <div className={classNames(styles.wrapper, className)}>
            <Form onSubmit={submitHandler}>
                <Wysiwyg autofocus name={'text'} formattedValue={text}/>
                <div className={styles.buttons}>
                    {setClose && <Button gray inline type={'button'} label={'Zavřít'} onClick={() => setClose()}/>}
                    <Button inline type={'submit'} label={'Uložit'}/>
                </div>
            </Form>
        </div>
    )
}

export default EditContent;