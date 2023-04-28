import { type AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppShell, MantineProvider } from "@mantine/core";

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

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  useEffect(() => {
    pusherClient.signin();

    return () => {
      pusherClient.disconnect();
    };
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
            <AppShell
              header={<ResponsiveHeader />}
              /*  className=" bg-white sm:bg-yellow-300 md:bg-blue-300 lg:bg-green-300 xl:bg-red-300" */
            >
              <Component {...pageProps} />
            </AppShell>
            {/*          <Button className="absolute right-0 bottom-0">
              <ChatBubbleLeftIcon fill="white" width={20} height={20} />
            </Button> */}
          </NotificationsProvider>
        </MantineProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
