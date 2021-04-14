import { useAppContext } from "../../AppContext";
import DoctorHome from "../DoctorHome";
import PatientHome from "../PatientHome";

function App() {
  const { currentUser } = useAppContext();
  console.log(currentUser)
  if (currentUser.role === "DOCTOR") {
    return <DoctorHome />;
  } else {
    return <PatientHome />;
  }
}

export default App;
