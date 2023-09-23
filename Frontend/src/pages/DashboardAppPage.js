import { Helmet } from "react-helmet-async";
// @mui
import { Grid, Container, Typography } from "@mui/material";
// sections
import { AppWidgetSummary } from "../sections/@dashboard/app";
import { useEffect, useState } from "react";
import axios from "axios";
//connection file
import { URL } from "../connection";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  // const [isLoading, setIsLoading] = useState(true);
  const [activeUsers, setActiveUsers] = useState(0);
  console.log(sessionStorage.getItem("email"));
  console.log(sessionStorage.getItem("role"));

  useEffect(() => {
    const getData = async () => {
      // setIsLoading(true);
      try {
        await axios
          .get(`${URL}/auth/v1/getusercount`)
          .then((response) => {
            console.log(response.data);
            // setActiveUsers(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {}
      // setIsLoading(false);
    };
    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Active Users"
              total={activeUsers}
              color="success"
              icon={"ant-design:android-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Active Test Formations"
              total={activeUsers}
              color="info"
              icon={"ant-design:windows-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Active Sections"
              total={activeUsers}
              color="info"
              icon={"ant-design:windows-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Active Questions"
              total={activeUsers}
              color="info"
              icon={"ant-design:windows-filled"}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
