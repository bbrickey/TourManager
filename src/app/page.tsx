import Image from "next/image";
import { DashboardMenu } from "../../components/DashboardMenu";

export default function Home() {
  return (
    <h1>
      Dead Bars Finance App
      <DashboardMenu />
    </h1>
  );
}
