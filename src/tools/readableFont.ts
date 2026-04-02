import { injectToolCSS } from "../utils/cssGenerator";
import IToolConfig from "../types/IToolConfig";
import { TEXT_SELECTORS } from "../enum/Selectors";

export const readableFontConfig: IToolConfig = {
    id: "readable-font",
    selector: `html`,
    childrenSelector: [
        '',
        '.dialog-off-canvas-main-canvas *:not(.material-icons,.fa)',
        '.ui-dialog *:not(.material-icons,.fa)',
        ...TEXT_SELECTORS
    ],
    styles: {
        'font-family': 'OpenDyslexic,Comic Sans MS,Arial,Helvetica,sans-serif'
    }
}

export default function readableFont(enable=false) {
    injectToolCSS({
        ...readableFontConfig,
        enable
    })
}