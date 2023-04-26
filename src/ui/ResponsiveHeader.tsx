import { Header, Group, Burger, Paper, Transition } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { NextLink } from "@mantine/next";
import { useRouter } from "next/router";

const links = [
  { label: "Home", link: "/" },
  { label: "Dashboard", link: "/dashboard" },
  { label: "About", link: "/about" },
  { label: "Chat", link: "/chat" },
  { label: "Forum", link: "/forum" },
  { label: "Contact", link: "mailto:ignazio.balisteri@code.berlin" },
] as const;

export function ResponsiveHeader() {
  const [opened, { toggle, close }] = useDisclosure(false);

  const { pathname } = useRouter();

  const items = links.map((link) => (
    <div key={link.label} className="my-4 h-full ">
      <NextLink
        legacyBehavior
        href={link.link}
        onClick={close}
        className={`rounded-lg p-4 text-lg  no-underline hover:bg-slate-200 md:my-0 md:text-base ${
          link.link === pathname ? "text-blue-600" : "text-gray-700"
        }`}
      >
        {link.label}
      </NextLink>
    </div>
  ));

  return (
    <Header height={60} mb={120} px={12} className="block">
      <div className="flex h-full items-center justify-between">
        <NextLink href="/" legacyBehavior>
          <AcademicCapIcon width={28} height={28} />
        </NextLink>
        <div className="hidden w-full justify-end md:flex lg:justify-center">
          <Group spacing={5}>{items}</Group>
        </div>

        <Burger
          opened={opened}
          onClick={toggle}
          size="sm"
          className="md:hidden"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper
              withBorder
              style={styles}
              className="absolute top-[60px] left-0 right-0 flex flex-col md:hidden"
            >
              {items}
            </Paper>
          )}
        </Transition>
      </div>
    </Header>
  );
}
