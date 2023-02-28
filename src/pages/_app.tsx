import { type AppType } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppShell, Group, Header, MantineProvider } from "@mantine/core";

import { api } from "../utils/api";

import "../styles/globals.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import Head from "next/head";
import AuthButton from "../ui/AuthButton";
import { NotificationsProvider } from "@mantine/notifications";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
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
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <AppShell
              header={
                <Header height={60}>
                  <Group>
                    <AuthButton />
                  </Group>
                </Header>
              }
            >
              <Component {...pageProps} />
            </AppShell>
          </NotificationsProvider>
        </MantineProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
