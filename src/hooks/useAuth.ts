import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { showNotification } from "@mantine/notifications";

export default function useRedirectUnauthenticated() {
  const data = useSession();
  const router = useRouter();

  useEffect(() => {
    if (data.status === "unauthenticated") {
      showNotification({
        title: "User Unauthenticated",
        message: `Redirecting...`,
        color: "red",
      });
      router.push("/");
    }
  }, [router, data.status]);
}
