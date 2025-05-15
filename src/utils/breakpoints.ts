import { breakpoints } from "../enum/Breakpoints";

export default function currentBreakpoint() {
    if (window.matchMedia(`(min-width: ${breakpoints.xxl}px)`).matches) {
        return breakpoints.xxl;
    }

    for (const value of Object.values(breakpoints)) {
        if (window.matchMedia(`(max-width: ${value}px)`).matches) {
            return value;
        }
    }

    return breakpoints.xs;
}
