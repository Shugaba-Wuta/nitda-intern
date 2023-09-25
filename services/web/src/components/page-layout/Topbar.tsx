import React, { useContext } from "react";
import { Box, IconButton, useTheme, Tooltip } from "@mui/material";
import { ColorModeContext } from "@src/theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

function Topbar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        margin: "0 0 0 auto",
        backgroundColor: "rgba(255, 255, 255, 0)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(4.1px)",

      }}
    >
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
