import { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useAppContext } from "../../AppContext";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";

const columns = [
  { field: "firstName", headerName: "First name", flex: 0.25 },
  { field: "lastName", headerName: "Last name", flex: 0.25 },
  { field: "email", headerName: "Email", flex: 0.25 },
  { field: "phoneNumber", headerName: "Phone Number", flex: 0.25 },
];

const DoctorHome = () => {
  const { currentUser } = useAppContext();
  const [rows, setRows] = useState([]);
  const history = useHistory();
  const { isLoading, error, data } = useQuery("getDoctorPatients", () =>
    fetch(
      `http://localhost:3001/users?doctorId=${currentUser.id}`
    ).then((res) => res.json())
  );
  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);
  if (isLoading) return "is loading";
  return (
    <Container style={{ height: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            columns={columns}
            rows={rows}
            onRowClick={(params) => history.push(`/patient/${params.id}`)}
          />
        </div>
      </div>
    </Container>
  );
};

export default DoctorHome;
