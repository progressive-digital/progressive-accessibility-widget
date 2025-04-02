import toggle from "../../utils/toggle";
import { renderMenu } from "../menu/menu";
import { ISeinnaSettings } from "../../sienna";
import translateMenu from "../menu/translateMenu";

export function renderWidget(options: ISeinnaSettings) {
    const widget = document.querySelector(".asw-container");
    if (!(widget instanceof HTMLElement)) {
        return;
    }

    let $btn: HTMLElement = widget.querySelector(".asw-menu-btn");

    let menu;
    $btn?.addEventListener("click", (event) => {    
        event.preventDefault();

        if(menu) {
            toggle(menu);
        } else {
            menu = renderMenu({
                ...options,
                container: widget,
            });
        }
    });
    
    translateMenu(widget);

    return widget;
}