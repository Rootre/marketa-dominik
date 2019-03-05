import React from 'react';
import CountdownNow from 'react-countdown-now';
import classNames from 'classnames';

import {isSameDay} from 'Helpers/date';
import {inflectString} from 'Helpers/strings';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function Countdown({date}) {
    const renderer = ({completed, days, hours, minutes, seconds}) => {
        return completed
            ? isSameDay(new Date(date), new Date())
                ? (
                    <p>Dneska se berem!</p>
                )
                : (
                    <p>A je po svatbě...</p>
                )
            : (
                <div className={styles.counter}>
                    <span><strong>{days}</strong> {inflectString(parseInt(days), ['den', 'dny', 'dnů'])}</span>
                    <span><strong>{hours}</strong> {inflectString(parseInt(hours), ['hodina', 'hodiny', 'hodin'])}</span>
                    <span><strong>{minutes}</strong> {inflectString(parseInt(minutes), ['minuta', 'minuty', 'minut'])}</span>
                    <span><strong>{seconds}</strong> {inflectString(parseInt(seconds), ['sekunda', 'sekundy', 'sekund'])}</span>
                </div>
            );
    };

    return (
        <div className={classNames(globalStyles.wrapperSmaller, styles.wrapper)}>
            <h2 className={globalStyles.heading}>Počítejte s námi</h2>
            <CountdownNow date={date} renderer={renderer}/>
        </div>
    )
}

export default Countdown;