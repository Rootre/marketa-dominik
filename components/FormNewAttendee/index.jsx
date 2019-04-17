import React, {useState} from 'react';
import classNames from 'classnames';

import Button from 'Components/Button';
import Input from 'Components/Input';

import AttendeePrototype from 'Prototypes/Attendee';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';
import useGlobalMap from "../../hooks/useGlobalMap";

const initialValues = {
    name: '',
    guests: 0,
};

function FormNewAttendee() {
    const [fetching, setFetching] = useState(false);
    const [values, setValues] = useState(initialValues);
    const [, addNotification] = useGlobalMap('notifications');


    const formSubmit = async () => {
        const attendeeModel = new AttendeePrototype(values.name, values.guests);

        if (values.name.trim() === '' || values.guests < 0) {
            addNotification('Špatně vyplněná pole', 'error');

            return;
        }

        setFetching(true);

        try {
            await attendeeModel.create();

            setValues(initialValues);
            addNotification('Počítáme s vámi!', 'success');
        } catch (e) {
            addNotification(e.message, 'error');
        }

        setFetching(false);
    };
    const inputChange = (name, value) => {
        setValues({...values, [name]: value});
    };

    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <h2 className={globalStyles.heading}>Budete tam?</h2>
            <p>Prosíme, potvrďte svoji účast, ať víme, kolik sudů narazit.</p>
            <div className={styles.form}>
                <div className={styles.inputs}>
                    <Input label={'Vaše jméno'} name={'name'} onChange={inputChange} required value={values.name}/>
                    <Input label={'Berete někoho s sebou?'} min={0} name={'guests'} onChange={inputChange} type={'number'}
                           value={values.guests}/>
                    <Button busy={fetching} label={'Potvrdit účast'} onClick={formSubmit}/>
                </div>
            </div>
        </div>
    )
}

export default FormNewAttendee;