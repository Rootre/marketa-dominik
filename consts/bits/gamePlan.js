import styles from 'Consts/maps/theme';
import brevnovLocation from 'Consts/maps/brevnovLocation';
import spejcharLocation from 'Consts/maps/spejcharLocation';

export default [
    {
        image: 'static/img/game-plan/sraz.jpg',
        text: 'Svatební obřad začíná v 15:00 v kostele sv. Markéty na Břevnově. (zastávka Břevnovský klášter tramvaje 25 a 22)',
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
        text: 'Po skončení obřadu se sejdeme před kostelem a uděláme si společné foto. Chceme vás tam všechny, tak se neostýchejte se s námi vyfotit. Pro ty, kteří se nechystají na oslavu, bude možnost pogratulovat po společném focení.',
        time: '16:30 - 17:00',
        title: 'Poobřadní focení',
    },
    {
        image: 'static/img/game-plan/cekame.jpg',
        text: 'Po focení a gratulacích pojedeme na svatební hostinu, která se koná v Dubči. Víme, že je to daleká cesta, ale věříme, že to pro vás nebude překážkou. Nejlepší spojení je ze zastávky Břevnovský klášter tramvají 22 na zastávku Malostranská a potom metrem A na zastávku Skalka. Z té autobusem 111 nebo 329 na zastávku Dubeč. Ze zastávky pak 2 minuty pěšky ke špejcharu.',
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
        text: '<strong>18:00</strong> - Svatební hostina začíná<br/><strong>20:00</strong> - Novomanželský tanec<br/><strong>21:00</strong> - Krájení svatebního dortu<br/><strong>22:00</strong> - Házení svatební kytice',
        time: '18:00',
        title: 'Party time!',
    },
];