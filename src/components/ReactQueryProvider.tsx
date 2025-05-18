"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ReactQueryProviderProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default ReactQueryProvider;
