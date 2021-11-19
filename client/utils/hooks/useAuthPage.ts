import { useRouter } from "next/dist/client/router";
import { useMeQuery } from "../../generated/graphql";

export const useAuthPage = () => {
  const { data, loading, error } = useMeQuery();
  const router = useRouter();

  if (!data?.me && loading === false) {
    router.push("/login");
  }
  return { data, loading, error, auth: data?.me && loading === false };
};
