import { Component, type ReactNode } from "react";

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  error: Error | null;
}

export default class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { error };
  }

  render() {
    const { error } = this.state;

    if (!error) return this.props.children;

    const status = (error as Error & { status?: number }).status;

    if (status === 404) {
      return (
        <main className="pt-16 p-4 container mx-auto">
          <h1>404</h1>
          <p>The requested page could not be found.</p>
        </main>
      );
    }

    const isDev = import.meta.env.DEV;
    const message =
      isDev && error instanceof Error ? error.message : "An unexpected error occurred.";

    return (
      <main className="pt-16 p-4 container mx-auto">
        <h1>Oops!</h1>
        <p>{message}</p>
        {isDev && error instanceof Error && error.stack && (
          <pre className="w-full p-4 overflow-x-auto">
            <code>{error.stack}</code>
          </pre>
        )}
      </main>
    );
  }
}