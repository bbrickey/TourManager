import Image from "next/image";
import ExpenseForm from "../../../components/ExpenseForm";
import Link from "next/link";
import AddTour from "../../../components/AddTour";
import { prisma } from "@/app/api/prismadb";
import Tours from "../tours-and-events/page";
import NavBar from "../../../components/NavBar";
/*
type tourList = {
    id: string;
    name: string;
}[];
*/
/*
type tour = {
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  start_date: Date;
  end_date: Date;
  billing_type: string;
  other_bands: string;
  notes: string;
  events: [];
}[];
*/
/*
function getTourData() {
  return prisma.tours.findMany({
    select: {
      name: true,
      id: true,
    },
  });
}

<ul>
        {tourData.map((tour) => (
          <li key={tour.name}>{tour.name}</li>
        ))}
      </ul>
*/

/*
function getTourList(data:tour) {
  let result: [tour:tourList]
  data.forEach(item) {
    let obj.id = item.id
  }
  return result
}
*/

export default async function Home() {
  //const tourData = await getTourData();
  //console.log(tourData);
  //const eventData = api.event.getEvents.useQuery();
  //console.log(eventData);
  //const tourList = getTourList(tourData)
  /*
  const tourData = [
    { name: "fun tour", id: "whatever" },
    { name: "fun tour 2", id: "whateveragain" },
  ];
  */

  return (
    <div>
      <NavBar />
      {/*<ExpenseForm tourdata={...tourData} />*/}
      <ExpenseForm />
      <Link href="/">Back to Dashboard </Link>
    </div>
  );
}
