import React from 'react'
import { Box, Tab, Tabs, Stack } from '@mui/material'

import CreateNysc from './CreateNysc'




//types
type User = "Nysc" | "Siwes" | "Intern" | "Staff"


function CreateUser() {
    const handleUserTypeChange = (event: React.SyntheticEvent, newValue: User) => {
        setUserType(() => newValue)
    }
    const handleCreateUserSubmit = () => { }
    const [userType, setUserType] = React.useState<User>('Nysc')



    return (
        <Stack component="section" display="flex" flexDirection="column" spacing={2} >
            {/* Navigation section for the /users route */}
            {/* <Box component="h2">
        USERS
      </Box> */}
            <Box component="nav">
                <Tabs
                    centered
                    value={userType}
                    onChange={handleUserTypeChange}
                    textColor='secondary'
                    indicatorColor='secondary'
                    sx={{
                        fontSize: "1.5rem",
                    }}

                >
                    <Tab label="Nysc" value="Nysc" />
                    <Tab label="Siwes" value="Siwes" />
                    <Tab label="Staff" value="Staff" />
                    <Tab label="Intern" value="Intern" />
                </Tabs>
            </Box>
            {/* Main section for the /users route */}
            <Box>
                <Box component="h3"
                    sx={{
                        fontWeight: "bold",
                    }}
                >
                    Creating A New {userType} User
                </Box>
                {userType === "Nysc" && <CreateNysc {...{ handleCreateUserSubmit }} />}
            </Box>
        </Stack >


    )
}





export default CreateUser