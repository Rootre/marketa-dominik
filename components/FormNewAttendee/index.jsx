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
    const [, addAttendee] = useGlobalMap('attendees');
    const [, addNotification] = useGlobalMap('notifications');


    const formSubmit = async () => {
        const attendeeModel = new AttendeePrototype(values.name, values.guests);

        setFetching(true);

        try {
            const {newAttendee} = await attendeeModel.create();

            addAttendee(newAttendee._id, newAttendee);
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
            <p>Prosím, potvrďte svoji účast, ať můžeme spočítat, kolik sudů narazit.</p>
            <Input label={'Vaše jméno'} name={'name'} onChange={inputChange} value={values.name}/>
            <Input label={'Berete někoho s sebou?'} name={'guests'} onChange={inputChange} type={'number'}
                   value={values.guests}/>
            <Button busy={fetching} label={'Potvrdit účast'} onClick={formSubmit}/>
        </div>
    )
}

export default FormNewAttendee;