import Image from "next/image";
import Link from "next/link";
import Calendar from "../../../components/Calendar";
import TourList from "../../../components/TourList";
import AddTour from "../../../components/AddTour";
import TourDashboard from "../../../components/TourDashboard";
//import "../calendar.css";

export default function Tours() {
  //const [openTour, setOpenTour] = useState(false)

  return (
    <div>
      <h1>Hello World </h1>
      <div>
        <TourDashboard />
      </div>
      {/*<Calendar />*/}
      <TourList />
      <Link href="/">Back to Dashboard </Link>
    </div>
  );
}
