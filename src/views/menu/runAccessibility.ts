import { getSettings } from "../../storage"
import adjustFontSize from "../../tools/adjustFontSize";
import currentBreakpoint from "../../utils/breakpoints";
import rebuildFontSize from "../../tools/rebuildFontSize";
import renderFilter from "./renderFilter";
import renderTools from "./renderTools";

export default function runAccessibility() {
    let { states } = getSettings();

    adjustFontSize(states?.['fontSize'] || 1);
    renderTools();
    renderFilter();

    let breakpoint = currentBreakpoint();
    window.addEventListener("resize", () => {
        const curr_breakpoint = currentBreakpoint()
        if (curr_breakpoint !== breakpoint) {
            breakpoint = curr_breakpoint;
            rebuildFontSize(states?.['fontSize'] || 1);
        }
    })
}