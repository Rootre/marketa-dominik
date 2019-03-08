import styles from 'Consts/maps/theme';
import brevnovLocation from 'Consts/maps/brevnovLocation';
import spejcharLocation from 'Consts/maps/spejcharLocation';

export default [
    {
        image: 'static/img/game-plan/sraz.jpg',
        time: '15:00',
        title: 'Sraz před kostelem',
        map: {
            center: brevnovLocation,
            options: {
                disableDefaultUI: true,
                styles,
            },
            text: 'Kostel Svaté Markéty - Břevnov'
        },
    },
    {
        image: 'static/img/game-plan/foceni.jpg',
        text: 'Lorem ipsum',
        time: '16:00 - 17:00',
        title: 'Poobřadní focení',
    },
    {
        image: 'static/img/game-plan/cekame.jpg',
        time: '17:30',
        title: 'Přesun na hostinu',
        map: {
            center: spejcharLocation,
            options: {
                disableDefaultUI: true,
                styles,
            },
            text: 'Historický Špejchar. Tady se bude slavit!'
        },
    },
    {
        image: 'static/img/game-plan/party.jpg',
        text: 'Lorem ipsum',
        time: '18:00',
        title: 'Party time!',
    },
];