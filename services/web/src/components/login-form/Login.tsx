import { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import KeyOutlined from "@mui/icons-material/KeyOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import * as yup from "yup";
import { Formik } from "formik";
import useLocalStorage from "@hooks/useLocalStorage";

import { inputFieldStyle as sx, primarySubmitBtnStyle } from "./FieldStyles";

// Login Form with validation
export const LoginForm = (props: {
  iconColor: string;
  textColor: string;
  bgColor: string;
  handleLoginFormSubmit(values: object): void;
}) => {
  const { iconColor, textColor, bgColor, handleLoginFormSubmit } = props;
  const inputFieldStyle = sx(iconColor || textColor);

  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be between 6 and 24 characters")
      .max(24, "Password must be between 6 and 24 characters")
      .required("Password is required"),
  });
  const [defaultEmail, setDefaultEmail] = useLocalStorage("defaultEmail", "");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const initialValues = {
    password: "",
    email: defaultEmail,
  };
  return (
    <Formik
      onSubmit={handleLoginFormSubmit}
      validationSchema={loginSchema}
      initialValues={initialValues}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <Box
          component={"form"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-evenly"}
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            size="small"
            id="email"
            name="email"
            label="Email"
            type="email"
            value={values.email}
            onBlur={(e) => {
              handleBlur(e);
              setDefaultEmail(values.email);
            }}
            onChange={handleChange}
            error={!!touched.email && !!errors.email}
            helperText={
              touched.email &&
              errors.email &&
              typeof errors.email === "string" &&
              errors.email
            }
            variant="standard"
            placeholder="example@example.com"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined sx={{ color: iconColor }} />
                </InputAdornment>
              ),
            }}
            sx={inputFieldStyle}
          />
          <TextField
            fullWidth
            size="small"
            id="password"
            name="password"
            label="Password"
            type={passwordHidden ? "password" : "text"}
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.password && !!errors.password}
            helperText={
              touched.password &&
              errors.password &&
              typeof errors.password === "string" &&
              errors.password
            }
            variant="standard"
            placeholder="secret"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyOutlined sx={{ color: iconColor }} />
                </InputAdornment>
              ),
              endAdornment: (
                <Tooltip title={passwordHidden ? "Show" : "Hide"}>
                  <IconButton
                    onClick={() => {
                      setPasswordHidden(!passwordHidden);
                    }}
                  >
                    {passwordHidden ? (
                      <VisibilityOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </IconButton>
                </Tooltip>
              ),
            }}
            sx={inputFieldStyle}
          />

          <TextField
            type="submit"
            size="small"
            role="button"
            value="Login"
            id="submit"
            sx={{
              ...primarySubmitBtnStyle(bgColor, textColor),
              mt: "2rem",
            }}
          />
        </Box>
      )}
    </Formik>
  );
};

// Confirm Change Password Form with validation
export const ConfirmPasswordChangeForm = (props: {
  iconColor: string;
  textColor: string;
  bgColor: string;
  handleLoginFormSubmit(values: object): void;
}) => {
  const { iconColor, textColor, bgColor, handleLoginFormSubmit } = props;
  const inputFieldStyle = sx(iconColor || textColor);

  const confirmPasswordSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    otpCode: yup
      .string()
      .min(4, "OTP Code must be between 4 and 6 characters")
      .max(6, "Password must be between 4 and 6 characters")
      .required("OTP Code is required"),
    newPassword: yup
      .string()
      .min(6, "New Password must be between 6 and 24 characters")
      .max(24, "New Password must be between 6 and 24 characters")
      .required("New Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Passwords must match"),
  });
  const [defaultEmail, setDefaultEmail] = useLocalStorage("defaultEmail", "");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [confirmPasswordHidden, setConfirmPasswordHidden] = useState(true);
  const initialValues = {
    newPassword: "",
    email: defaultEmail,
    confirmPassword: "",
    otpCode: "",
  };
  return (
    <Formik
      onSubmit={handleLoginFormSubmit}
      validationSchema={confirmPasswordSchema}
      initialValues={initialValues}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <Box
          component={"form"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-evenly"}
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            size="small"
            id="email"
            name="email"
            label="Email"
            type="email"
            disabled
            value={values.email}
            onBlur={(e) => {
              handleBlur(e);
              setDefaultEmail(values.email);
            }}
            onChange={handleChange}
            error={!!touched.email && !!errors.email}
            helperText={
              touched.email &&
              errors.email &&
              typeof errors.email === "string" &&
              errors.email
            }
            variant="standard"
            placeholder="example@example.com"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined sx={{ color: iconColor }} />
                </InputAdornment>
              ),
            }}
            sx={inputFieldStyle}
          />
          <TextField
            fullWidth
            size="small"
            id="otpCode"
            name="otpCode"
            label="OTP Code"
            type="text"
            value={values.otpCode}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.otpCode && !!errors.otpCode}
            helperText={
              touched.otpCode &&
              errors.otpCode &&
              typeof errors.otpCode === "string" &&
              errors.otpCode
            }
            variant="standard"
            placeholder="OTP Code"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyOutlined sx={{ color: iconColor }} />
                </InputAdornment>
              ),
            }}
            sx={{ ...inputFieldStyle }}
          />

          <TextField
            fullWidth
            size="small"
            id="newPassword"
            name="newPassword"
            label="New Password"
            type={passwordHidden ? "password" : "text"}
            value={values.newPassword}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.newPassword && !!errors.newPassword}
            helperText={
              touched.newPassword &&
              errors.newPassword &&
              typeof errors.newPassword === "string" &&
              errors.newPassword
            }
            variant="standard"
            placeholder="secret"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyOutlined sx={{ color: iconColor }} />
                </InputAdornment>
              ),
              endAdornment: (
                <Tooltip title={passwordHidden ? "Show" : "Hide"}>
                  <IconButton
                    onClick={() => {
                      setPasswordHidden(!passwordHidden);
                    }}
                  >
                    {passwordHidden ? (
                      <VisibilityOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </IconButton>
                </Tooltip>
              ),
            }}
            sx={inputFieldStyle}
          />
          <TextField
            fullWidth
            size="small"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type={confirmPasswordHidden ? "password" : "text"}
            value={values.confirmPassword}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.confirmPassword && !!errors.confirmPassword}
            helperText={
              touched.confirmPassword &&
              errors.confirmPassword &&
              typeof errors.confirmPassword === "string" &&
              errors.confirmPassword
            }
            variant="standard"
            placeholder="secret"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyOutlined sx={{ color: iconColor }} />
                </InputAdornment>
              ),
              endAdornment: (
                <Tooltip title={confirmPasswordHidden ? "Show" : "Hide"}>
                  <IconButton
                    onClick={() => {
                      setConfirmPasswordHidden(!confirmPasswordHidden);
                    }}
                  >
                    {confirmPasswordHidden ? (
                      <VisibilityOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </IconButton>
                </Tooltip>
              ),
            }}
            sx={inputFieldStyle}
          />
          <TextField
            type="submit"
            size="small"
            value="Change Password"
            id="submit"
            sx={{ ...primarySubmitBtnStyle(bgColor, textColor), mt: "2rem" }}
          />
        </Box>
      )}
    </Formik>
  );
};

// Request Change Password Form with validation
export const RequestChangePassword = (props: {
  iconColor: string;
  textColor: string;
  bgColor: string;
  handleLoginFormSubmit(values: object): void;
}) => {
  const { iconColor, textColor, bgColor, handleLoginFormSubmit } = props;
  const inputFieldStyle = sx(iconColor || textColor);

  const loginSchema = yup.object().shape({
    email: yup
      .string()

      .email("Invalid email")
      .required("Email is required"),
  });
  const [defaultEmail, setDefaultEmail] = useLocalStorage("defaultEmail", "");
  const initialValues = {
    email: defaultEmail,
  };
  return (
    <Formik
      onSubmit={handleLoginFormSubmit}
      validationSchema={loginSchema}
      initialValues={initialValues}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <Box
          component={"form"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-evenly"}
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            size="small"
            id="email"
            name="email"
            label="Email"
            type="email"
            value={values.email}
            onBlur={(e) => {
              handleBlur(e);
              setDefaultEmail(values.email);
            }}
            onChange={handleChange}
            error={!!touched.email && !!errors.email}
            helperText={
              touched.email &&
              errors.email &&
              typeof errors.email === "string" &&
              errors.email
            }
            variant="standard"
            placeholder="example@example.com"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined sx={{ color: iconColor }} />
                </InputAdornment>
              ),
            }}
            sx={inputFieldStyle}
          />

          <TextField
            type="submit"
            size="small"
            value="Reset Password"
            id="submit"
            sx={{
              ...primarySubmitBtnStyle(bgColor, textColor),
              mt: "2rem",
            }}
          />
        </Box>
      )}
    </Formik>
  );
};
