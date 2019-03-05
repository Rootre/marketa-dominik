import React, {forwardRef, useImperativeHandle, useEffect, useState} from 'react';
import classNames from 'classnames';

import InputHidden from '../InputHidden';
import InputPassword from '../InputPassword';

import {generateID} from '../../helpers/strings';

import styles from './styles.scss';

function Input({className, errorMessage, id = generateID(), label, name, onChange, type = 'text', value = '', ...rest}, ref) {
    const [stateValue, setStateValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [hasError] = useState(false);

    if (type === 'hidden') {
        return <InputHidden name={name} value={value}/>;
    }

    useImperativeHandle(ref, () => ({
        isEmpty: () => stateValue.trim() === '',
        reset: () => setStateValue(value),
        set: (_value) => setStateValue(_value),
        value: () => stateValue,
    }));

    return (
        <div className={classNames(styles.container, className, {
            [styles.focused]: isFocused,
            [styles.filled]: onChange ? value && value.length > 0 : stateValue && stateValue.length > 0,
            [styles.hasError]: hasError,
        })}>
            {label && <label className={styles.label} htmlFor={id}>{label}</label>}
            {type === 'password' ? (
                <InputPassword name={name} value={stateValue} setIsFocused={setIsFocused} onChange={setStateValue}/>
            ) : (
                <input id={id}
                       type={type}
                       value={onChange ? value : stateValue}
                       name={name}
                       onFocus={() => setIsFocused(true)}
                       onBlur={() => setIsFocused(false)}
                       onChange={({target: {value}}) => onChange ? onChange(name, value) : setStateValue(value)}
                       {...rest}
                />
            )}
            {hasError && <p className={styles.error}>{errorMessage}</p>}
        </div>
    )
}

export default forwardRef(Input);