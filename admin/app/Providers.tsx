"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from "@/components/theme/theme-provider"; // shadcn/ui or custom

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </Provider>
  );
}
