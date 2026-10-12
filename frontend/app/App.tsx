import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "react-router-dom";
import StoryListPage from "~/pages/StoryListPage";
import StoryDetailPage from "~/pages/StoryDetailPage";
import NotFoundPage from "~/pages/NotFoundPage";
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
              <StoryListPage />
            </DefaultLayout>
          )}
        />
        <Route
          exact
          path="/:id"
          render={() => (
            <DefaultLayout>
              <StoryDetailPage />
            </DefaultLayout>
          )}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </QueryClientProvider>
  );
}
