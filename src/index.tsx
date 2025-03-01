import { ProgressProvider } from "@bprogress/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import { Toaster } from "sonner";

import routes from "./lib/routes.tsx";
import "./styles/tailwindcss.css";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 60,
        },
    },
});

const router = createBrowserRouter(routes);

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);

    root.render(
        <StrictMode>
            <ProgressProvider
                options={{ showSpinner: false, trickle: true }}
                color="var(--color-primary)"
                height="3px"
            >
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </ProgressProvider>
            <Toaster expand={true} richColors={true} position="top-center" />
        </StrictMode>,
    );
}
