import Image from "next/image";
import Link from "next/link";
import Calendar from "../../../components/Calendar";
import TourList from "../../../components/TourList";
import AddTour from "../../../components/AddTour";
import TourDashboard from "../../../components/TourDashboard";
import NavBar from "../../../components/NavBar";
//import "../calendar.css";

export default function Tours() {
  //const [openTour, setOpenTour] = useState(false)

  return (
    <div>
      <NavBar />
      {/*<Calendar />*/}
      <TourDashboard />
      <TourList />
      <Link href="/">Back to Dashboard </Link>
    </div>
  );
}
