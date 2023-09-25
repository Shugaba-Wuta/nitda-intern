import React, { useState } from "react";
import {
	Menu,
	MenuItem,
	Sidebar as ProSidebar,
} from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
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
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";


import { useAppSelector, useAppDispatch } from "@src/store";
import { hexToRgba, toTitleCase } from "@src/utils/generic-utils";
import { logoutThunk } from "@src/store/authSlice";


type ActiveNavItem = "Home" | "Users" | "Add User" | "Payroll" | "Department" | "Departments" | "Documents" | "Calendar" | "Logout";
interface IItem {
	title: ActiveNavItem;
	to: string;
	icon: React.ReactElement;
}
interface ISidebarProps {
	userRole: string;
	activeNav: ActiveNavItem;
}


const HOME_SIDEBAR: Omit<IItem, "selected" | "setSelected"> = {
	to: "/",
	icon: <HomeOutlinedIcon />,
	title: "Home",
}
const USERS_SIDEBAR: Omit<IItem, "selected" | "setSelected"> = {
	to: "/users",
	icon: <PeopleOutlinedIcon />,
	title: "Users",
}
const ADD_USER_SIDEBAR: Omit<IItem, "selected" | "setSelected"> = {
	to: "/users/register",
	icon: <PersonAddAltOutlinedIcon />,
	title: "Add User",
}
const PAYROLL_SIDEBAR: Omit<IItem, "selected" | "setSelected"> = {
	to: "/payroll",
	icon: <AttachMoneyOutlinedIcon />,
	title: "Payroll",
}
const MY_DEPARTMENT_SIDEBAR: Omit<IItem, "selected" | "setSelected"> = {
	to: "/department",
	icon: <GroupsOutlinedIcon />,
	title: "Department",
}
const DEPARTMENTS_SIDEBAR: Omit<IItem, "selected" | "setSelected"> = {
	to: "/departments",
	icon: <GroupsOutlinedIcon />,
	title: "Departments",
}
const DOCUMENTS_SIDEBAR: Omit<IItem, "selected" | "setSelected"> = {
	to: "/documents",
	icon: <FileCopyOutlinedIcon />,
	title: "Documents",
}
const CALENDAR_SIDEBAR: Omit<IItem, "selected" | "setSelected"> = {
	to: "/calendar",
	icon: <CalendarTodayOutlinedIcon />,
	title: "Calendar",
}

const DEFAULT_USER_SIDEBAR_COLLECTION = [HOME_SIDEBAR, DOCUMENTS_SIDEBAR, CALENDAR_SIDEBAR, USERS_SIDEBAR]
const STAFF_USER_SIDEBAR_COLLECTION = [HOME_SIDEBAR, USERS_SIDEBAR, MY_DEPARTMENT_SIDEBAR, DOCUMENTS_SIDEBAR, CALENDAR_SIDEBAR]
const HR_USER_SIDEBAR_COLLECTION = [HOME_SIDEBAR, USERS_SIDEBAR, ADD_USER_SIDEBAR, PAYROLL_SIDEBAR, DEPARTMENTS_SIDEBAR, DOCUMENTS_SIDEBAR, CALENDAR_SIDEBAR]







const SideNavigation = (props: ISidebarProps) => {
	const { activeNav = "Home" } = props;
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [selected, setSelected] = useState<ActiveNavItem>(activeNav);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const userRole = useAppSelector((state) => state.auth.userInfo?.role);
	const permissions = useAppSelector((state) => state.auth.userInfo?.permissions);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();



	const handleLogout = () => {
		dispatch(logoutThunk())
			.unwrap()
			.then(() => {
				navigate("/login")
			}).catch(() => {
				navigate("/login")
			})

	}


	const NavigationItem = ({ title, to, icon }: IItem) => {
		const theme = useTheme();
		const colors = tokens(theme.palette.mode);
		const isActive = title === selected;
		return (
			<MenuItem
				active={isActive}//{selected === title}
				style={{
					color: colors.gray[100],
					margin: "0",
				}}
				onClick={() => {
					setSelected(title);
				}}
				{...{ icon }}
				component={<Link {...{ to }} />}
			>
				<Typography color={isActive ? colors.gray[900] : colors.gray[100]}>{title}</Typography>
			</MenuItem>
		);
	};
	const proNavbarBGColor = () => {
		const baseColor = theme.palette.mode === "dark" ? colors.green[900] : colors.gray[100];
		const opacity = (sideBarBG && theme.palette.mode) === "dark" ? 0.9 : 0.2;

		return hexToRgba(
			baseColor,
			opacity
		)
	}



	return (
		<Box
			sx={{
				"& .ps-sidebar-container": {
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
				},
			}}
		>
			<ProSidebar
				image={sideBarBG}
				backgroundColor={`${proNavbarBGColor()}`}
				breakPoint="xs" // Breakpoint for collapsing menu
				style={{
					height: "100vh",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					position: "sticky",
					top: 0,
					left: 0,
					zIndex: 20,
					minHeight: "100vh",
					margin: 0,
					padding: 0,
				}
				}
				collapsed={isCollapsed}
			>
				<Menu
					menuItemStyles={{
						button: {
							"&:hover": {
								backgroundColor: colors.green[800],
							},
							"&": {
								borderRadius: isCollapsed ? "10px 0  0 10px" : "0px",
								margin: "10rem ",
							}
						},
						"root": {
							marginLeft: "1rem",
						}
					}}
					rootStyles={{
						"& a.ps-active": {
							background: colors.green[100],
						},
						"& .ps-active": {
							color: colors.green[900],
							fontVariant: "small-caps",
						},
					}}
				>
					{/* Menu icon for collapsing menu */}
					<MenuItem
						style={{
							margin: "1rem 0 2rem 0rem",
							color: colors.gray[100],
							borderRadius: "0"
						}}
						onClick={() => {
							setIsCollapsed(!isCollapsed);
						}}
						icon={isCollapsed && <EastOutlinedIcon />}
					>
						{!isCollapsed && (
							<Box
								display="flex"
								justifyContent="space-between"
								alignItems="center"
							>
								<Typography variant="h4" color={colors.gray[100]} fontWeight="bold">
									{permissions?.includes("admin") ? "ADMIN" : userRole?.toUpperCase()}
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
					{userRole && userRole.toUpperCase() === "STAFF" && !permissions?.includes(toTitleCase("admin")) && STAFF_USER_SIDEBAR_COLLECTION.map((navItem, index) => {
						return <NavigationItem {...navItem} key={index} />
					})}

					{userRole && userRole.toUpperCase() === "STAFF" && permissions?.includes(toTitleCase("admin")) && HR_USER_SIDEBAR_COLLECTION.map((navItem, index) => {
						return <NavigationItem {...navItem} key={index} />
					})}

					{userRole && ["INTERN", "NYSC", "SIWES",].includes(userRole.toUpperCase()) && DEFAULT_USER_SIDEBAR_COLLECTION.map((navItem, index) => {
						return <NavigationItem {...navItem} key={index} />
					})}
				</Menu>
				<Menu
					menuItemStyles={{
						button: {
							"&:hover": {
								backgroundColor: colors.green[800],
							},
							"&": {
								borderRadius: isCollapsed ? "10px 0  0 10px" : "0px",
								margin: "10rem ",
							},
						},
						root: {
							marginLeft: "1rem",
						},
					}}>
					<MenuItem icon={<LogoutOutlined />}
						style={{
							color: colors.gray[100],
							margin: "0",
							marginBottom: "auto",
						}}
						onClick={() => { handleLogout() }}
					>
						<Typography sx={{
							"&:hover": {
								fontWeight: "bold",
								fontVariant: "small-caps",
								fontSize: "1.2rem",
							}

						}}>Logout</Typography>
					</MenuItem>
				</Menu>
			</ProSidebar>
		</Box >
	);
};

export default SideNavigation;
