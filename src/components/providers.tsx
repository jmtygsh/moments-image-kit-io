import React from "react";

import {SessionProvider} from "next-auth/react";
import {ThemeProvider} from "next-themes";

import {MediaProvider} from "@/contexts/media-context";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({children}: ProvidersProps) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <MediaProvider>{children}</MediaProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
