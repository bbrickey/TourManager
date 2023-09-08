import Image from "next/image";
import { DashboardMenu } from "../../components/DashboardMenu";
import NavBar from "../../components/NavBar";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";
import Login from "../../components/Login";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="main-body">
      {/*<NavBar />*/}
      <div className="demo-desc">
        <div className="demo-paragraphs">
          <p>
            To view a demo of the Tour Manager app, please click "Continue as
            Guest" below.
          </p>
          <p>
            You will have full read-only access to the app, but permissions to
            submit forms will be removed.
          </p>
        </div>
        <div className="demo-link">
          <Link href="/add-income">Continue as Guest</Link>
        </div>
      </div>
      <Login />

      {/*<DashboardMenu /> */}
    </div>
  );
}
