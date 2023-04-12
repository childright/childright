import { type AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppShell, Button, MantineProvider } from "@mantine/core";

import { api } from "../utils/api";

import "../styles/globals.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import Head from "next/head";
import { NotificationsProvider } from "@mantine/notifications";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ResponsiveHeader } from "../ui/ResponsiveHeader";
import { useEffect } from "react";
import { pusherClient } from "../utils/pusher";
import RiveContext from "../utils/AnimationContext";
import { DEFAULT_STATE_MACHINE } from "../utils/constants";
import { useRive } from "@rive-app/react-canvas";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  useEffect(() => {
    pusherClient.signin();

    return () => {
      pusherClient.disconnect();
    };
  }, []);

  const { rive, RiveComponent, canvas } = useRive({
    src: "/animatedcharacter.riv",
    autoplay: true,
    stateMachines: DEFAULT_STATE_MACHINE,
  });

  return (
    <>
      <Head>
        <title>ChildRight</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <SessionProvider session={session}>
        <ReactQueryDevtools />
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <RiveContext.Provider value={{ rive, RiveComponent, canvas }}>
              <AppShell header={<ResponsiveHeader />}>
                <Component {...pageProps} />
              </AppShell>
              <Button className="absolute right-0 bottom-0">
                <ChatBubbleLeftIcon fill="white" width={20} height={20} />
              </Button>
            </RiveContext.Provider>
          </NotificationsProvider>
        </MantineProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
