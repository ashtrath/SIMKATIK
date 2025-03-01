import { Bar, Peg, Progress, useProgress } from "@bprogress/react";
import { useIsFetching } from "@tanstack/react-query";
import * as React from "react";
import { Outlet, useLocation } from "react-router";

const RootLayout = () => {
    const timerRef = React.useRef<NodeJS.Timeout | null>(null);
    const [isProgressActive, setIsProgressActive] = React.useState(false);

    const progress = useProgress();
    const location = useLocation();
    const isFetching = useIsFetching();

    // biome-ignore lint/correctness/useExhaustiveDependencies: used for handling route change
    React.useEffect(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setIsProgressActive(true);
        timerRef.current = setTimeout(() => setIsProgressActive(false), 500);
    }, [location.key]);

    React.useEffect(() => {
        if (isFetching > 0) {
            if (timerRef.current) clearTimeout(timerRef.current);
            setIsProgressActive(true);
        } else {
            if (timerRef.current) clearTimeout(timerRef.current);
            setIsProgressActive(true);
            timerRef.current = setTimeout(() => setIsProgressActive(false), 300);
        }
    }, [isFetching]);

    React.useEffect(() => {
        if (isProgressActive) {
            progress.start();
        } else {
            progress.stop();
        }
    }, [isProgressActive, progress]);

    return (
        <>
            <Progress>
                <Bar>
                    <Peg />
                </Bar>
            </Progress>
            <Outlet />
        </>
    );
};

export default RootLayout;
