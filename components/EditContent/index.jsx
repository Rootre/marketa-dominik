import React, {useEffect} from 'react';

import CheckSVG from 'Svg/check.svg';
import CloseSVG from 'Svg/close.svg';

import styles from './styles.scss';

function EditContent({saveChanges, setClose, text = ''}) {
    const inputRef = React.createRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <div className={styles.wrapper}>
            <textarea className={styles.textarea} ref={inputRef} defaultValue={text}/>
            <div className={styles.controls}>
                <CheckSVG onClick={() => saveChanges(inputRef.current)} className={styles.save}/>
                {setClose && <CloseSVG onClick={() => setClose()} className={styles.close}/>}
            </div>
        </div>
    )
}

export default EditContent;