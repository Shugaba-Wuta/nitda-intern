import { useAppDispatch, useAppSelector } from '@src/store'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material';
import { removeAlert } from '@store/alertsSlice';



const MAX_ALERT_TIME_MILLISECONDS = 50_000
const MAX_ALERTS = 10
const ErrorDisplay = () => {
    const dispatch = useAppDispatch()
    const alerts = useAppSelector((state) => state.alerts)



    const AlertTheme = createTheme({
        components: {
            MuiAlert: {
                styleOverrides: {
                    root: {
                        paddingY: 0,
                        margin: 10,
                    }
                }
            },
            MuiAlertTitle: {
                styleOverrides: {
                    root: {
                        padding: 0,
                        margin: 0,
                        lineHeight: 0.75,

                    }
                }
            }
        }
    })

    return (

        <Box sx={{
            position: "relative",
            maxWidth: "50%",
            maxHeight: "99vh",
            zIndex: 100,
            marginLeft: "auto",
        }} component={"section"} aria-label='Alerts'>
            <Stack spacing={0.25} sx={{ position: "absolute", right: 5, top: 5 }}>
                <ThemeProvider theme={AlertTheme}>
                    {
                        alerts
                            .filter(alert => new Date(alert.createdAt) > new Date(Date.now() - MAX_ALERT_TIME_MILLISECONDS))
                            .sort((a, b) => {
                                return b.createdAt.localeCompare(a.createdAt)
                            })
                            .reverse()
                            .slice(0, MAX_ALERTS)
                            .reverse()
                            .map((alert) => {
                                return (
                                    <Alert variant='standard' severity={alert.type}
                                        onClose={() => dispatch(removeAlert({ id: alert.id }))} key={alert.id}
                                    >
                                        <AlertTitle sx={{ fontStyle: "italic" }}>{alert.title}</AlertTitle>
                                        {alert.alertMessage}
                                    </Alert>
                                )
                            })
                    }
                </ThemeProvider>
            </Stack>
        </Box >
    )
}

export default ErrorDisplay