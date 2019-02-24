import React, {useEffect} from 'react';
import {useGlobal} from 'reactn';

import {
DESKTOP_BREAKPOINT,
DESKTOP_LARGE_BREAKPOINT,
MOBILE_BREAKPOINT,
TABLET_BREAKPOINT
} from 'Consts/breakpoints';
import {isRetina} from 'Helpers/client';

function BreakpointWatcher() {
    const [, setBreakpoint] = useGlobal('breakpoint');
    const [, setIsRetina] = useGlobal('isRetina');

    const handleResize = () => {
        if (self.innerWidth <= MOBILE_BREAKPOINT) {
            setBreakpoint(MOBILE_BREAKPOINT);
        } else if (self.innerWidth <= TABLET_BREAKPOINT) {
            setBreakpoint(TABLET_BREAKPOINT);
        } else if (self.innerWidth <= DESKTOP_BREAKPOINT) {
            setBreakpoint(DESKTOP_BREAKPOINT);
        } else {
            setBreakpoint(DESKTOP_LARGE_BREAKPOINT);
        }
    };

    // componentDidMount
    useEffect(() => {
        self.addEventListener('resize', handleResize);
        handleResize();

        setIsRetina(isRetina());

        // componentWillUnmount
        return () => {
            self.removeEventListener('resize', handleResize);
        }
    }, []);

    return null;
}

export default BreakpointWatcher;