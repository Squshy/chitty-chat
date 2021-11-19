import { useRouter } from "next/dist/client/router";
import { useMeQuery } from "../generated/graphql";

export const authPage = () => {
  const { data, loading } = useMeQuery();
  const router = useRouter();

  if (!data?.me && loading === false) {
    return router.push("/login");
  }
};
