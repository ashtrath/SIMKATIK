import { useSuspenseQuery } from "@tanstack/react-query";
import AnalyticsService from "../services/AnalyticsService";
import type { AnalyticsData } from "../types";

const useAnalytics = () => {
    const {
        data: analytics,
        isLoading: isFetching,
        error: fetchError,
    } = useSuspenseQuery<AnalyticsData>({
        queryKey: ["analytics"],
        queryFn: AnalyticsService.getAnalytics,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
    });

    return {
        analytics,
        isLoading: isFetching,
        error: {
            analytics: fetchError,
        },
    };
};

export default useAnalytics;
