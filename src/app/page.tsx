import Image from "next/image";
import { DashboardMenu } from "../../components/DashboardMenu";
import NavBar from "../../components/NavBar";

export default function Home() {
  return (
    <div className="main-body">
      <NavBar />
      <DashboardMenu />
    </div>
  );
}
