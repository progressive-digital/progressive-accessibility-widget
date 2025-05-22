export function currentBreakpoint(breakpoints: Record<string, string>) {
    for (const value of Object.values(breakpoints)) {
        if (window.matchMedia(value).matches) {
            return value;
        }
    }

    return Object.values(breakpoints)[0] || '';
}

export function getBreakpoints() {
    try {
        const raw = document.body.dataset["awsBreakpoints"];
        if (!raw) {
            throw new Error('Missing data attribute');
        }

        const parsed = JSON.parse(raw) as Record<string, unknown>;

        return Object.fromEntries(
            Object.entries(parsed).filter(
                ([, value]) => typeof value === 'string'
            )
        ) as Record<string, string>;

    } catch (e) {
        // silent error
    }
}