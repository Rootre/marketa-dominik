import {RETINA_PIXEL_RATIO} from 'Consts/device';
import {
    DESKTOP_BREAKPOINT,
    DESKTOP_LARGE_BREAKPOINT,
    MOBILE_BREAKPOINT,
    TABLET_BREAKPOINT
} from 'Consts/breakpoints';

export function getPixelRatio() {
    return typeof window === 'undefined' ? 1 : window.devicePixelRatio;
}

export function isRetina() {
    if (typeof window === 'undefined') {
        return false;
    }

    return getPixelRatio() >= RETINA_PIXEL_RATIO;
}

export function isMobile(breakpoint) {
    return breakpoint === MOBILE_BREAKPOINT;
}

export function isTablet(breakpoint) {
    return breakpoint === TABLET_BREAKPOINT;
}

export function isDesktop(breakpoint) {
    return breakpoint === DESKTOP_BREAKPOINT;
}

export function isDesktopLarge(breakpoint) {
    return breakpoint === DESKTOP_LARGE_BREAKPOINT;
}

export function isAboveMobile(breakpoint) {
    return [TABLET_BREAKPOINT, DESKTOP_BREAKPOINT, DESKTOP_LARGE_BREAKPOINT].includes(breakpoint);
}

export function isAboveTablet(breakpoint) {
    return [DESKTOP_BREAKPOINT, DESKTOP_LARGE_BREAKPOINT].includes(breakpoint);
}

export function isAboveDesktop(breakpoint) {
    return [DESKTOP_LARGE_BREAKPOINT].includes(breakpoint);
}

export function isUntilTablet(breakpoint) {
    return [MOBILE_BREAKPOINT].includes(breakpoint);
}

export function isUntilDesktop(breakpoint) {
    return [MOBILE_BREAKPOINT, TABLET_BREAKPOINT].includes(breakpoint);
}

export function isUntilDesktopLarge(breakpoint) {
    return [MOBILE_BREAKPOINT, TABLET_BREAKPOINT, DESKTOP_BREAKPOINT].includes(breakpoint);
}