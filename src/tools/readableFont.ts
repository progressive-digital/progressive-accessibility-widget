import { injectToolCSS } from "../utils/cssGenerator";
import IToolConfig from "../types/IToolConfig";
import { TEXT_SELECTORS } from "../enum/Selectors";

export const readableFontConfig: IToolConfig = {
    id: "readable-font",
    selector: `html`,
    childrenSelector: ['', '*:not(.material-icons,.fa)', ...TEXT_SELECTORS]
}

export default function readableFont(enable=false) {
    injectToolCSS({
        ...readableFontConfig,
        enable
    })
}