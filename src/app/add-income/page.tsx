import Image from "next/image";
import ExpenseForm from "../../../components/ExpenseForm";
import Link from "next/link";
import AddTour from "../../../components/AddTour";
import { prisma } from "@/app/api/prismadb";
import Tours from "../tours-and-events/page";
import NavBar from "../../../components/NavBar";

export default async function Home() {
  return (
    <div>
      <NavBar />
      {/*<ExpenseForm tourdata={...tourData} />*/}
      <ExpenseForm />
    </div>
  );
}
