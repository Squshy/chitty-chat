import { useApolloClient } from "@apollo/client";
import { SideBar } from "../components/sideBar/SideBar";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

export default function Home() {
  const { data, loading } = useMeQuery();
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();

  if (loading) {
    return <div className="w-full h-screen bg-gray-100"></div>;
  } else {
    return (
      <div className="flex h-screen">
        <SideBar />
        {JSON.stringify(data)}
        {data?.me && (
          <button
            className="p-4 bg-blue-500 rounded h-16 w-auto"
            onClick={() => {
              logout();
              apolloClient.resetStore();
            }}
          >
            logout
          </button>
        )}
      </div>
    );
  }
}
