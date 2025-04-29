import apiClient from "~/lib/apiClient";
import type { AnalyticsData } from "../types";

const AnalyticsService = {
    getAnalytics: async (): Promise<AnalyticsData> => {
        const { data } = await apiClient.get("/admin/dashboard/analytics");
        return data;
    },
};

export default AnalyticsService;
