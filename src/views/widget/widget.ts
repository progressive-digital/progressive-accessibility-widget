import toggle from "../../utils/toggle";
import { renderMenu } from "../menu/menu";
import { ISeinnaSettings } from "../../sienna";
import translateMenu from "../menu/translateMenu";

export function renderWidget(options: ISeinnaSettings) {
    let menu;
    document.querySelectorAll(".asw-container")
    .forEach(widget => {
        if (!(widget instanceof HTMLElement)) {
            return;
        }

        const $btn: HTMLElement = widget.querySelector(".asw-menu-btn");

        $btn?.addEventListener("click", (event) => {
            event.preventDefault();

            if(menu) {
                toggle(menu);
            } else {
                menu = renderMenu({
                    ...options,
                    container: document.body,
                });
            }
        });

        translateMenu(widget);
    });
}