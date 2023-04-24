import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function useRedirectUnauthenticated() {
  const data = useSession();
  const router = useRouter();

  useEffect(() => {
    if (data.status === "unauthenticated") {
      router.push("/");
    }
  }, [router, data.status]);
}
