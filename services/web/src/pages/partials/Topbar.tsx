import React, { useContext } from "react";
import { Box, IconButton, useTheme, Tooltip } from "@mui/material";
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

function Topbar() {
  const theme = useTheme();
  //   const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Box display="flex" justifyContent="flex-end" p={2}>
        {/* Other icons */}
        <Box display="flex">
          <Tooltip title="Notifications">
            <IconButton>
              <NotificationsOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Settings">
            <IconButton>
              <SettingsOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Logout">
            <IconButton>
              <LogoutOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={(theme.palette.mode === "dark" ? "Light" : "Dark") + " Mode"}
          >
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "light" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}

export default Topbar;
