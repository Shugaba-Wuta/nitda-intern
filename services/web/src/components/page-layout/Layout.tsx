import Box from "@mui/material/Box";
import { IDecodedUserInfo } from "@src/types/auth";
import SideNavigation from "./Sidebar";
import Topbar from "./Topbar";
import { useAppSelector } from "@src/store";
import { ProtectedRoute } from "@components/ProtectedRoute";


function Layout({ children }: { children: React.ReactNode }) {
    const decodedToken = useAppSelector(state => state.auth.userInfo) || {} as IDecodedUserInfo
    const { role: userRole } = decodedToken

    return (
        <ProtectedRoute>
            <Box display="flex"

            >
                <SideNavigation {...{ userRole, activeNav: "Home" }} />
                <Box sx={{
                    flexGrow: 1,
                }}>
                    <Topbar />
                    <Box component="section"
                        sx={{
                            margin: "auto",
                            padding: "1rem",
                        }}
                    >
                        {children}
                    </Box>

                </Box>
            </Box>
        </ProtectedRoute>
    )
}

export default Layout