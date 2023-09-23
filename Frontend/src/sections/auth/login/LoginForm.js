import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
import MenuItem from "@mui/material/MenuItem";
import { useCookies } from "react-cookie";

//connection files
import { URL } from "../../../connection";
import LoginvalidationSchema from "../../../components/Validation/Login";
import SignupvalidationSchema from "../../../components/Validation/SignUp";

// ----------------------------------------------------------------------

export default function LoginForm({ authType, setType, onLogin }) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies("jwt");
  const mail = useRef("null");
  const password = useRef("null");
  const username = useRef("null");
  const role = useRef("null");
  const [err, setErr] = useState("");
  useEffect(() => {
    navigate("/", { replace: true });
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("role");
  }, [
    sessionStorage.getItem("jwt"),
    sessionStorage.getItem("username"),
    sessionStorage.getItem("email"),
    sessionStorage.getItem("role"),
  ]);
  const register = async () => {
    const userDetails = {
      username: username.current.value,
      password: password.current.value,
      email: mail.current.value,
      role: role.current.value,
    };
    SignupvalidationSchema.validate(userDetails)
      .then(async (validData) => {
        try {
          const response = await axios.post(
            `${URL}/auth/v1/register`,
            userDetails
          );
          // console.log(response.data);
          if (response.data.msg.includes("registerd successfully")) {
            setTimeout(() => {
              window.location.reload();
            }, 3000);
            toast.success("Registration successful! Login to Continue...", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          } else {
            toast.error(response.data.msg, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          }
          //navigate("/dashboard", { replace: true });
        } catch (err) {
          console.log("request not wokring", err);
        }
      })
      .catch(({ errors }) => setErr(errors[0]));

    // console.log(userDetails);
  };

  const login = async () => {
    const userDetails = {
      email: mail.current.value,
      password: password.current.value,
    };
    LoginvalidationSchema.validate(userDetails)
      .then(async (validData) => {
        try {
          const response = await axios.post(
            `${URL}/auth/v1/login`,
            userDetails
          );
          // console.log(response.data);
          if (response.data.message?.includes("logged in successfully")) {
            console.log(response);
            setCookie("jwt", response.data.token, { path: "/" });
            sessionStorage.setItem("jwt", response.data.token);
            sessionStorage.setItem("username", response.data.username);
            sessionStorage.setItem("email", userDetails.email);
            sessionStorage.setItem("role", response.data.role);
            onLogin();
            navigate("/dashboard", { replace: true });
          } else {
            toast.error(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          }
        } catch (err) {
          console.log("request not wokring", err);
        }
      })
      .catch(({ errors }) => setErr(errors[0]));
  };

  const reset = async () => {
    const userDetails = {
      email: mail.current.value,
      newPassword: password.current.value,
    };
    const response = await axios.post(
      `${URL}/auth/v1/resetPassword`,
      userDetails
    );
    // console.log(response.data);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate("/dashboard", { replace: true });
  };

  const roles = ["admin", "student", "examiner"];

  return (
    <>
      {authType === "signup" ? (
        <Stack spacing={3}>
          <TextField
            name="email"
            label="Email address"
            type="text"
            inputRef={mail}
          />
          <TextField
            name="username"
            label="Username"
            type="text"
            inputRef={username}
          />
          <TextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            inputRef={password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            select
            label="Role"
            defaultValue="student"
            helperText="Please select any role"
            inputRef={role}
          >
            {roles.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      ) : authType === "login" ? (
        <Stack spacing={3}>
          <TextField name="email" label="Email address" inputRef={mail} />

          <TextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            inputRef={password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      ) : (
        <Stack spacing={3}>
          <TextField name="email" label="Email address" inputRef={mail} />

          <TextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            inputRef={password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="password"
            label="Confirm Password"
            inputRef={password}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      )}

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        {/* <Checkbox name="remember" label="Remember me" /> */}
        {authType === "login" ? (
          <Link variant="subtitle2" underline="hover">
            <a
              onClick={() => {
                setType("reset");
              }}
            >
              Forgot password?
            </a>
          </Link>
        ) : (
          <Stack></Stack>
        )}
      </Stack>
      <p style={{ color: "red" }}>{err}</p>
      {authType === "signup" ? (
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={register}
        >
          Sign Up
        </LoadingButton>
      ) : authType === "login" ? (
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={login}
        >
          Login
        </LoadingButton>
      ) : (
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={reset}
        >
          Reset
        </LoadingButton>
      )}
      <ToastContainer />
    </>
  );
}
