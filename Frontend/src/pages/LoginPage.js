import { Helmet } from "react-helmet-async";
// @mui
import { styled } from "@mui/material/styles";
import {
  Link,
  Container,
  Typography,
  Divider,
  Stack,
  Button,
  Box,
} from "@mui/material";
// hooks
import useResponsive from "../hooks/useResponsive";
// components
import Logo from "../components/images/logo.png";
import Iconify from "../components/iconify";
// sections
import { LoginForm } from "../sections/auth/login";
import { useState } from "react";

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

export default function LoginPage(props) {
  const mdUp = useResponsive("up", "md");
  const [authType, setType] = useState("login");

  return (
    <>
      <Helmet>
        <title>Studybreak Exam Portal</title>
      </Helmet>

      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <Box mb={5} ml={5}>
              <img src={Logo} alt="logo" width={180} />
            </Box>

            <Typography variant="h3" sx={{ px: 5, mb: 5 }}>
              Hello! Welcome Back
            </Typography>
            <img
              src="/assets/illustrations/illustration_login.png"
              alt="login"
            />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            {authType === "signup" ? (
              <Typography variant="h4" gutterBottom>
                Sign Up to Studybreak Exam Portal
              </Typography>
            ) : authType === "reset" ? (
              <Typography variant="h4" gutterBottom>
                Reset Password
              </Typography>
            ) : (
              <Typography variant="h4" gutterBottom>
                Sign In to Studybreak Exam Portal
              </Typography>
            )}

            {authType === "signup" ? (
              <Typography variant="body2" sx={{ mb: 5 }}>
                Already have an account ? {""}
                <a
                  onClick={() => {
                    setType("login");
                  }}
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                >
                  Login here
                </a>
              </Typography>
            ) : authType === "login" ? (
              <Typography variant="body2" sx={{ mb: 5 }}>
                Don't have an account? {""}
                <a
                  onClick={() => {
                    setType("signup");
                  }}
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                >
                  Get started
                </a>
              </Typography>
            ) : (
              <Typography variant="body2" sx={{ mb: 5 }}>
                Wish to try again ? {""}
                <a
                  onClick={() => {
                    setType("login");
                  }}
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                >
                  Login here
                </a>
              </Typography>
            )}

            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify
                  icon="eva:google-fill"
                  color="#DF3E30"
                  width={22}
                  height={22}
                />
              </Button>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify
                  icon="eva:github-fill"
                  color="#000000"
                  width={22}
                  height={22}
                />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                OR
              </Typography>
            </Divider>

            <LoginForm
              authType={authType}
              setType={setType}
              onLogin={props.onLogin}
            />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
