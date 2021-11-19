import { BaseLogoutButton } from "../components/buttons/BaseLogoutButton";
import { SideBar } from "../components/sideBar/SideBar";
import { User } from "../generated/graphql";
import { useAuthPage } from "../utils/hooks/useAuthPage";

export default function Home() {
  const { data, loading, auth } = useAuthPage();

  if (loading || !auth) {
    return <div className="w-full h-screen"></div>;
  } else {
    return (
      <div className="flex h-screen">
        <SideBar user={data!.me as User}/>
        <div className="shadow-inner p-8">
          hey
        </div>
      </div>
    );
  }
}
