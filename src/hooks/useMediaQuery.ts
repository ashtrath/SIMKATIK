import * as React from "react";

export const useMediaQuery = (query: string): boolean => {
    const getMatches = (query: string): boolean => {
        return window.matchMedia(query).matches;
    };

    const [matches, setMatches] = React.useState<boolean>(() => {
        return getMatches(query);
    });

    // Handles the change event of the media query.
    const handleChange = () => {
        setMatches(getMatches(query));
    };

    // biome-ignore lint/correctness/useExhaustiveDependencies: handleChange changes on every re-render
    React.useLayoutEffect(() => {
        const matchMedia = window.matchMedia(query);
        handleChange();

        // Use deprecated `addListener` and `removeListener` to support Safari < 14
        if (matchMedia.addListener) {
            matchMedia.addListener(handleChange);
        } else {
            matchMedia.addEventListener("change", handleChange);
        }

        return () => {
            if (matchMedia.removeListener) {
                matchMedia.removeListener(handleChange);
            } else {
                matchMedia.removeEventListener("change", handleChange);
            }
        };
    }, [query]);

    return matches;
};
