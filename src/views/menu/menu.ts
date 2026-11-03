// @ts-ignore
import template from "./menu.html";

import FilterButtons from "./FilterButtons";
import ContentButtons from "./ContentButtons";
import ToolButtons from "../../enum/TOOL_PRESETS";

import renderButtons from "./renderButtons";
import { bindDialogKeys, closeMenu } from "./dialog";
import adjustFontSize from "../../tools/adjustFontSize";
import renderTools from "./renderTools";
import { getSettings, getState, saveSettings, saveState } from "../../storage";
import reset from "./reset";
import renderFilter from "./renderFilter";
import translateMenu from "./translateMenu";

import { ILanguage, LANGUAGES } from "../../enum/Languages";

export interface IRenderMenuArgs {
    container: HTMLElement,
    position?: string,
    lang?: string
}

export function renderMenu({
    container,
    position,
    ...options
}: IRenderMenuArgs) {
    const $container: HTMLElement = document.createElement("div");
    $container.innerHTML = template;

    const $menu: HTMLElement = $container.querySelector(".asw-menu");

    if(position?.includes("right")) {
        $menu.style.right = '0px';
        $menu.style.left = 'auto';
    }

    $menu.querySelector(".content").innerHTML = renderButtons(ContentButtons);
    $menu.querySelector(".tools").innerHTML = renderButtons(ToolButtons, 'asw-tools');
    $menu.querySelector(".contrast").innerHTML = renderButtons(FilterButtons, 'asw-filter');

    $container.querySelectorAll('.asw-menu-close, .asw-overlay').forEach((el: HTMLElement) => {
        el.addEventListener('click', () => {
            closeMenu($container);
        });
    })

    $menu.querySelectorAll(".asw-adjust-font div[role='button']").forEach((el: HTMLElement) => {
        el.addEventListener("click", () => {
            const margin = 0.1;

            let fontSize = getState("fontSize") ?? 1;
            if(el.classList.contains('asw-minus')) {
                fontSize -= margin;
            } else {
                fontSize += margin;
            }

            fontSize = Math.max(fontSize, 0.1);
            fontSize = Math.min(fontSize, 2);
            fontSize = Number(fontSize.toFixed(2));
            
            adjustFontSize(fontSize || 1);

            saveState({ fontSize });
        });
    });

    $menu.querySelectorAll(".asw-btn").forEach((el: HTMLElement) => {
        el.addEventListener("click", () => {
            let key = el.dataset.key;

            let isSelected = !el.classList.contains("asw-selected");

            if(el.classList.contains('asw-filter')) {
                $menu.querySelectorAll('.asw-filter').forEach((el: HTMLElement) => {
                    el.classList.remove('asw-selected');
                    el.setAttribute('aria-pressed', 'false');
                });

                saveState({
                    contrast: isSelected ? key : false
                });

                if(isSelected) {
                    el.classList.add('asw-selected');
                    el.setAttribute('aria-pressed', 'true');
                }

                renderFilter();
            } else {
                el.classList.toggle('asw-selected', isSelected);
                el.setAttribute('aria-pressed', String(isSelected));

                saveState({
                    [key]: isSelected
                });

                renderTools();
            }
        });
    });

    $menu.querySelector('.asw-menu-reset')?.addEventListener('click', () => {
        reset();
    });

    
    let settings = getSettings();

    let fontSize = Number(settings?.states?.fontSize) || 1;

    if(fontSize != 1) {
        $menu.querySelector(".asw-amount").innerHTML = `${ fontSize * 100 }%`;
    }

    let $lang: HTMLSelectElement = $menu.querySelector("#asw-language");
    $lang.innerHTML = LANGUAGES.map((lang: ILanguage) => `<option value="${lang.code}">${lang.label}</option>`).join('');

    if(settings.lang !== options.lang) {
        saveSettings({
            lang: options.lang
        });
    }
    
    $lang.value = options?.lang || "en";

    $lang?.addEventListener("change", () => {
        saveSettings({
            lang: $lang.value
        });

        translateMenu(container);
    });

    translateMenu($menu);
    
    if(settings.states) {
        for(let key in settings.states) {
            if(settings.states[key] && key !== "fontSize") {
                let selector = key === "contrast" ? settings.states[key] : key;
                const $btn = $menu.querySelector(`.asw-btn[data-key="${ selector }"]`);
                $btn?.classList.add("asw-selected");
                $btn?.setAttribute("aria-pressed", "true");
            }
        }
    }

    $container.querySelectorAll("svg").forEach(svg => svg.setAttribute("aria-hidden", "true"));
    bindDialogKeys($container, $menu);

    container.appendChild($container);

    return $container;
}