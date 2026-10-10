import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "react-router-dom";
import Home from "~/pages/home";
import NotFound from "~/pages/not-found";
import { DefaultLayout } from "~/widgets/layouts";

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        retry: 3,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          )}
        />
        <Route component={NotFound} />
      </Switch>
    </QueryClientProvider>
  );
}