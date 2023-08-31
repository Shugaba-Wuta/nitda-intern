import { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { useTitleChange } from "@hooks/useTitleChange";
import nitdaHQ from "@static/nitda-hq.jpg";
import nitdaTextLogo from "@static/nitda-cropped-logo.png";
import { tokens } from "@src/theme";
import {
  ConfirmPasswordChangeForm,
  LoginForm,
  RequestChangePassword,
} from "@components/login-form/Login";
import { ILoginPayload, IResetPasswordPayload } from "@src/types/auth";
import { loginThunk } from "@src/store/authSlice";
import { useAppDispatch } from "@src/store";
import { passwordRequestOTPByEmail, resetPasswordByOTP } from "@utils/services";


const Login = ({ title }: { title: string }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentFormType, setCurrentFormType] = useState(title);
  const dispatch = useAppDispatch();

  const FORM_TYPE = {
    RESET_PASSWORD: "Reset Password",
    LOGIN: "Login",
    CHANGE_PASSWORD: "Change Password",
  };

  useTitleChange(title);

  const handleLoginFormSubmit = async (values: ILoginPayload) => {
    dispatch(loginThunk(values));
  };

  const handleForgotPasswordFormSubmit = async (values: { email: string }) => {
    const { email } = values;
    passwordRequestOTPByEmail(email);
  };
  const handleResetPasswordFormSubmit = async (values: Omit<IResetPasswordPayload, "tokenPurpose">) => {

    await resetPasswordByOTP({ ...values, tokenPurpose: "PASSWORD-CHANGE" })

  }
  return (
    // Background setup
    <Box
      height={"100vh"}
      width={"100vw"}
      position={"relative"}
      padding={"0 min(20px, 4rem, 5%)"}
      sx={{
        backgroundImage: `url(${nitdaHQ})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Glassmorphism container  */}
      <Box
        sx={{
          // height: "60%",
          maxWidth: "1600px",
          minHeight: "fit-content",
          background: "rgba(255, 255, 255, 0.5)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(4.1px)",
          borderRadius: "5px",
          padding: "30px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Title section  */}
        <Box
          display={"flex"}
          sx={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={`${nitdaTextLogo}`}
            alt="NITDA text logo"
            height={"60rem"}
          />
          <Typography
            sx={{
              fontSize: "1.75rem",
              color: "#004E2B",
              fontWeight: "500",
              mt: "min(5px, 1rem)",
            }}
          >
            Intern Portal
          </Typography>
        </Box>
        <Box mt={"2rem"}>
          {/* Form Input and Button */}
          {currentFormType === FORM_TYPE.LOGIN && (
            <LoginForm
              iconColor={colors.gray[100]}
              textColor={colors.gray[900]}
              bgColor={colors.green[100]}
              handleLoginFormSubmit={handleLoginFormSubmit}
            />
          )}
          {currentFormType === FORM_TYPE.CHANGE_PASSWORD && (
            <ConfirmPasswordChangeForm
              iconColor={colors.gray[100]}
              textColor={colors.gray[900]}
              bgColor={colors.green[100]}
              handleLoginFormSubmit={handleResetPasswordFormSubmit}
            />
          )}

          {currentFormType === FORM_TYPE.RESET_PASSWORD && (
            <RequestChangePassword
              iconColor={colors.gray[100]}
              textColor={colors.gray[900]}
              bgColor={colors.green[100]}
              handleLoginFormSubmit={handleForgotPasswordFormSubmit}
            />
          )}
        </Box>
        <Box mt={"4rem"}>
          {/*  Glassmorphism footer navigation */}
          {currentFormType === FORM_TYPE.LOGIN && (
            <Typography sx={{
              display: "flex",
            }}>
              Forgot password?{""}
              <Box
                component={"a"}
                sx={{
                  ml: "5px",
                  cursor: "pointer",
                  ":hover": {
                    color: colors.green[300],
                  },
                  fontWeight: 700,
                  textDecoration: "underline",
                }}
                onClick={() => {
                  setCurrentFormType(FORM_TYPE.RESET_PASSWORD);
                }}
              >
                Click here
              </Box>
              <EastIcon sx={{ marginLeft: "3px" }} />
            </Typography>
          )}

          {currentFormType !== FORM_TYPE.LOGIN && (
            <>
              <Typography>
                <Box
                  component={"a"}
                  sx={{
                    display: "flex",
                    cursor: "pointer",
                    p: "0.25rem",
                    ":hover": {
                      color: colors.green[300],
                      textDecoration: "underline",
                    },
                    fontWeight: 500,
                  }}
                  onClick={() => {
                    setCurrentFormType(FORM_TYPE.LOGIN);
                  }}
                >
                  <WestIcon sx={{ align: "center", justifyItems: "center", marginRight: "5px" }} />Back to login
                </Box>
              </Typography>
              {/* // Hides "Have OTP Code" on the Reset form screen */}
              {(currentFormType !== FORM_TYPE.CHANGE_PASSWORD) &&

                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    p: "0.25rem",
                    opacity: 0.75,
                    fontStyle: "italic",
                  }}
                >
                  <Box
                    component={"a"}
                    sx={{
                      display: "flex",
                      cursor: "pointer",
                      ":hover": {
                        color: colors.green[300],
                        textDecoration: "underline",
                      },
                    }}
                    onClick={() => {
                      setCurrentFormType(FORM_TYPE.CHANGE_PASSWORD);
                    }}
                  >
                    Have OTP Code? <EastIcon fontSize="small" sx={{ ml: "5px" }} />
                  </Box>
                </Typography>}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default Login;
