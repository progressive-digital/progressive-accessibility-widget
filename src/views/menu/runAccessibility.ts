import { getSettings } from "../../storage"
import adjustFontSize from "../../tools/adjustFontSize";
import { currentBreakpoint, getBreakpoints } from "../../utils/breakpoints";
import rebuildFontSize from "../../tools/rebuildFontSize";
import renderFilter from "./renderFilter";
import renderTools from "./renderTools";

export default function runAccessibility() {
    let { states } = getSettings();

    adjustFontSize(states?.['fontSize'] || 1);
    renderTools();
    renderFilter();

    const breakpoints = getBreakpoints();
    if (breakpoints) {
        let breakpoint = currentBreakpoint(breakpoints);
        window.addEventListener("resize", () => {
            const curr_breakpoint = currentBreakpoint(breakpoints);
            if (curr_breakpoint !== breakpoint) {
                breakpoint = curr_breakpoint;
                rebuildFontSize(states?.['fontSize'] || 1);
            }
        })
    }
}
