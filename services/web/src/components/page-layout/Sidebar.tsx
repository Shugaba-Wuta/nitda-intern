import React, { Dispatch, SetStateAction, useState } from "react";
import {
	Menu,
	MenuItem,
	Sidebar as ProSidebar,
} from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Stack } from "@mui/material";
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
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';

import { useAppSelector } from "@src/store";
import { hexToRgba, toTitleCase } from "@src/utils/generic-utils";


interface IItem {
	title: string;
	to: string;
	icon: React.ReactElement;
	selected: string;
	setSelected: Dispatch<SetStateAction<string>>;
}


const HOME_SIDEBAR = {
	to: "/dashboard",
	icon: <HomeOutlinedIcon />,
	title: "Home",
}
const USERS_SIDEBAR = {
	to: "/users",
	icon: <PeopleOutlinedIcon />,
	title: "Users",
}
const ADD_USER_SIDEBAR = {
	to: "/users/register",
	icon: <PersonAddAltOutlinedIcon />,
	title: "Add User",
}
const PAYROLL_SIDEBAR = {
	to: "/payroll",
	icon: <AttachMoneyOutlinedIcon />,
	title: "Payroll",
}
const MY_DEPARTMENT_SIDEBAR = {
	to: "/department",
	icon: <GroupsOutlinedIcon />,
	title: "Department",
}
const DEPARTMENTS_SIDEBAR = {
	to: "/departments",
	icon: <GroupsOutlinedIcon />,
	title: "Departments",
}
const DOCUMENTS_SIDEBAR = {
	to: "/documents",
	icon: <FileCopyOutlinedIcon />,
	title: "Documents",
}
const CALENDAR_SIDEBAR = {
	to: "/calendar",
	icon: <CalendarTodayOutlinedIcon />,
	title: "Calendar",
}

const DEFAULT_USER_SIDEBAR_COLLECTION = [HOME_SIDEBAR, DOCUMENTS_SIDEBAR, CALENDAR_SIDEBAR, USERS_SIDEBAR]
const STAFF_USER_SIDEBAR_COLLECTION = [HOME_SIDEBAR, USERS_SIDEBAR, MY_DEPARTMENT_SIDEBAR, DOCUMENTS_SIDEBAR, CALENDAR_SIDEBAR]
const HR_USER_SIDEBAR_COLLECTION = [HOME_SIDEBAR, USERS_SIDEBAR, ADD_USER_SIDEBAR, PAYROLL_SIDEBAR, DEPARTMENTS_SIDEBAR, DOCUMENTS_SIDEBAR, CALENDAR_SIDEBAR]




const NavigationItem = ({ title, to, icon, selected, setSelected }: IItem) => {
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


const SideNavigation = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [selected, setSelected] = useState("Home");
	const [isCollapsed, setIsCollapsed] = useState(false);
	const userRole = useAppSelector((state) => state.auth.userInfo?.role);
	const permissions = useAppSelector((state) => state.auth.userInfo?.permissions);





	return (
		<Box position="sticky" top={0} bottom={0} zIndex={100} height={"100vh"}>
			<ProSidebar
				image={sideBarBG}
				backgroundColor={`${hexToRgba(
					colors.green[900],
					sideBarBG && theme.palette.mode === "dark" ? 0.95 : 0.1
				)}`}
				breakPoint="xs"
				collapsed={isCollapsed}
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
					{/* Menu icon for collapsing menu */}
					<MenuItem
						onClick={() => {
							setIsCollapsed(!isCollapsed);
						}}
						icon={isCollapsed && <EastOutlinedIcon />}
						style={{
							margin: "10px 0 10px 0",
							color: colors.gray[100],
						}}
					>
						{!isCollapsed && (
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
										setIsCollapsed(!isCollapsed);
									}}
								>
									<WestOutlinedIcon />
								</IconButton>
							</Box>
						)}
					</MenuItem>
					{/* Menu items */}
					<Stack paddingLeft={isCollapsed ? "10%" : "0"} spacing={4}>
						{userRole && userRole.toUpperCase() === "STAFF" && !permissions?.includes(toTitleCase("admin")) && STAFF_USER_SIDEBAR_COLLECTION.map(navItem => {
							return <NavigationItem {...navItem} {...{ selected, setSelected }} />
						})}

						{userRole && userRole.toUpperCase() === "STAFF" && permissions?.includes(toTitleCase("admin")) && HR_USER_SIDEBAR_COLLECTION.map(navItem => {
							return <NavigationItem {...navItem} {...{ selected, setSelected }} />
						})}

						{userRole && ["INTERN", "NYSC", "SIWES",].includes(userRole.toUpperCase()) && DEFAULT_USER_SIDEBAR_COLLECTION.map(navItem => {
							return <NavigationItem {...navItem} {...{ selected, setSelected }} />
						})}

					</Stack>
				</Menu>
			</ProSidebar>
		</Box>
	);
};

export default SideNavigation;
