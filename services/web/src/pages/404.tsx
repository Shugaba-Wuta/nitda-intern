import React from 'react'
import { Box, Stack } from '@mui/material'
import technologyBG from '@static/technology-bg.jpg'
import { useTheme } from '@mui/material'
import { tokens } from '@src/theme'
import { useNavigate } from 'react-router-dom'

const Error404 = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    return (
        <Box component="section"
            sx={
                {
                    minHeight: "100vh",
                    margin: "auto",
                }
            }
        >
            <Stack direction="column" spacing={5}
                sx={
                    {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }
                }>

                <Box component="h1"
                    sx={{
                        fontSize: "10rem",
                        fontWeight: "900",
                        backgroundImage: `url(${technologyBG})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        color: "transparent",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        lineHeight: "1.2",
                    }}
                >
                    Oops!

                </Box>
                <Box component="h2" style={{
                    wordSpacing: "0.3rem",
                    letterSpacing: "0.2rem",
                }} > 404-Page not Found </Box>
                <Box component="p"
                    style={{
                        width: "35%",
                        textAlign: "center",
                        fontWeight: "500",
                    }}>
                    The page you are looking for might have been removed, had its name changed or is temporarily unavailable.

                </Box>
                <Box component="a"
                    sx={{
                        padding: "1rem 2rem",
                        borderRadius: "5px",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        backgroundColor: "transparent",
                        outline: "2px solid",
                        "&:hover": {
                            backgroundColor: colors.gray[100],
                            color: colors.gray[900],
                        }

                    }}
                    onClick={() => navigate("/")}
                >
                    Go to Homepage
                </Box>
            </Stack>


        </Box>
    )
}

export default Error404