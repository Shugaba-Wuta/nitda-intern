import { useState } from 'react'
import { Box, Tabs, Tab, Stack } from '@mui/material'
import CreateUser from './CreateUser'

type PageType = "view" | "create"

function UserIndex() {
  const [currentTab, setCurrentTab] = useState<PageType>("view")

  function handleTabChange(event: React.SyntheticEvent, newValue: PageType) {
    setCurrentTab(newValue)
  }



  return (
    <Stack component="section" display="flex" flexDirection="column" spacing={6}>
      {/* Navigation section for the /users route */}
      {/* <Box component="h2">
        USERS
      </Box> */}
      <Box component="nav">
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          textColor='secondary'
          indicatorColor='secondary'

        >
          <Tab label="View Users" value="view" />
          <Tab label="Create User" value="create" />
        </Tabs>
      </Box>
      {/* Main section for the /users route */}
      <Box component="main">
        {currentTab === "view" && <div>View Users</div>}
        {currentTab === "create" && <CreateUser />}
      </Box>
    </Stack>
  )
}
export default UserIndex