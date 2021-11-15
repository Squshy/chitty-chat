import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { SideBar } from "../components/sideBar/SideBar";
import { useMeQuery } from "../generated/graphql";

export default function Home() {
  const { data, loading } = useMeQuery();
  const router = useRouter();

  // useEffect(() => {
  //   if (!data?.me && loading === false) router.push("/login");
  // }, [data]);

  if (loading) {
    return <div className="w-full h-screen bg-gray-100"></div>;
  } else  {
    return (
      <div className="flex h-screen">
        <SideBar />
        {JSON.stringify(data)}
      </div>
    );
  }
}
