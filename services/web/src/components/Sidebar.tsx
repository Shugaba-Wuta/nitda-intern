import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Menu,
  MenuItem,
  Sidebar as ProSidebar,
  useProSidebar,
} from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import sideBarBG from "@static/nitda-ball.png";
import { tokens } from "@src/theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Home");
  const { collapseSidebar, collapsed } = useProSidebar();
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  interface IItem {
    title: string;
    to: string;
    icon: React.ReactElement;
    selected: string;
    setSelected: Dispatch<SetStateAction<string>>;
  }

  const Item = ({ title, to, icon, selected, setSelected }: IItem) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        style={{ color: colors.gray[100] }}
        onClick={() => {
          setSelected(title);
        }}
        {...{ icon }}
        component={<Link {...{ to }} />}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    );
  };

  return (
    <Box position="sticky" top={0} bottom={0} zIndex={100} height={"100vh"}>
      <ProSidebar
        image={sideBarBG}
        backgroundColor={`${hexToRgba(
          colors.green[900],
          sideBarBG && theme.palette.mode === "dark" ? 0.95 : 0.1
        )}`}
        breakPoint="xs"
      >
        <Menu
          menuItemStyles={{
            button: {
              "&:hover": {
                backgroundColor: colors.green[800],
              },
            },
          }}
          rootStyles={{
            "& a.ps-active": {
              background: colors.gray[100],
            },
            "& .ps-active": {
              color: colors.green[800],
            },
          }}
        >
          {/* Menu icon */}
          <MenuItem
            onClick={() => {
              collapseSidebar(!collapsed);
            }}
            icon={collapsed && <EastOutlinedIcon />}
            style={{
              margin: "10px 0 10px 0",
              color: colors.gray[100],
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h6" color={colors.gray[100]}>
                  ROLE
                </Typography>
                <IconButton
                  onClick={() => {
                    collapseSidebar(!collapsed);
                  }}
                >
                  <WestOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {/* Menu items */}
          <Box paddingLeft={collapsed ? "10%" : "0"}>
            <Item
              title="Home"
              to="/home"
              icon={<HomeOutlinedIcon />}
              {...{ selected, setSelected }}
            />
            <Typography
              color={colors.gray[100]}
              sx={{ m: "10px 0 0 10px", fontStyle: "italic" }}
            >
              General
            </Typography>
            <Item
              title="Users"
              to="/users"
              icon={<PeopleOutlinedIcon />}
              {...{ selected, setSelected }}
            />
            <Item
              title="Add User"
              to="/users/register"
              icon={<PersonAddAltOutlinedIcon />}
              {...{ selected, setSelected }}
            />
            <Item
              title="Payroll"
              to="/payroll"
              icon={<AttachMoneyOutlinedIcon />}
              {...{ selected, setSelected }}
            />
            <Item
              title="Department"
              to="/department"
              icon={<GroupsOutlinedIcon />}
              {...{ selected, setSelected }}
            />

            <Item
              title="Documents"
              to="/documents"
              icon={<AttachMoneyOutlinedIcon />}
              {...{ selected, setSelected }}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              {...{ selected, setSelected }}
            />
            <Typography
              color={colors.gray[100]}
              sx={{ m: "10px 0 0 10px", fontStyle: "italic" }}
            >
              Archive
            </Typography>
            <Item
              title="Archive-Users"
              to="/archive"
              icon={<PeopleOutlinedIcon />}
              {...{ selected, setSelected }}
            />
            <Typography
              color={colors.gray[100]}
              sx={{ m: "10px 0 0 10px", fontStyle: "italic" }}
            >
              More
            </Typography>
            <Item
              title="More-Users"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              {...{ selected, setSelected }}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
