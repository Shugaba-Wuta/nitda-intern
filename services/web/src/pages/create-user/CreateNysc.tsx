import { useCallback } from "react";
import { Formik, getIn, useFormik } from "formik";
import { Stack, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button, Autocomplete, useTheme } from '@mui/material';

import { nyscInitVal, DEPARTMENTS_LIST, OFFICE_LOCATION, BANKS_LIST, POSSIBLE_PERMISSIONS, } from './constants';
import { nyscSchema } from './yup-schemas';
import { tokens } from '@src/theme';
import { useLocalStorage } from '@src/hooks/useLocalStorage'
import { fetchAccountName } from "@utils/services";
import { addNewAlert } from "@src/store/alertsSlice";
import { useAppDispatch } from "@store/index";


interface Props {
    handleCreateUserSubmit: () => void
}

export function CreateNysc({ handleCreateUserSubmit }: Props) {
    const dispatch = useAppDispatch()
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [nyscForm, setNyscForm] = useLocalStorage('nyscForm', JSON.parse(window.localStorage.getItem("nyscForm") as string) || nyscInitVal)
    const formik = useFormik({
        initialValues: nyscForm,
        onSubmit: (values) => {
            console.log("\n\n\n\n", values, "\n\n\n\n")
            console.log("Submitting...")
            return handleCreateUserSubmit()
        },
        validationSchema: nyscSchema
    })
    return (
        <Formik
            initialValues={nyscForm}
            onSubmit={(val) => {
                setNyscForm(val)
                console.log("\n\n\n\n", val, "\n\n\n\n")
                console.log("Submitting...")

                return handleCreateUserSubmit()
            }}
            validationSchema={nyscSchema}
        >{({ handleSubmit, handleBlur, handleChange, values, errors, touched, setFieldValue }) => {

            /**
             *
             *
             *
             *
             *
             * FUNCTIONS THAT USE VALUES FROM THE FORMIK COMPONENT
             *
             *
             *
             *
             *
             *
             */

            function getAccountName() {
                //This function uses the backend as a proxy server to call the paystack API to get bank information.
                const accountNumber: string = values.account.accountNumber
                const bankCode: string | undefined = values.account.bankCode?.value
                if (accountNumber.length >= 10 && bankCode) {
                    fetchAccountName(accountNumber, bankCode).then(response => {
                        if (response.data) {
                            setFieldValue("account.accountName", response.data.account_name)
                        } else throw new Error("Hi, an error")
                    })
                        .catch((err) => {//eslint-disable-line
                            setFieldValue("account.accountName", "")
                            dispatch(addNewAlert("Unable to fetch account details", "info"))
                        })
                }
            }


            return (
                <Stack
                    spacing={3}
                    component="form"
                    onSubmit={handleSubmit}
                    marginBottom={"3rem"}
                >
                    <Grid container spacing={1} justifyContent="space-between">
                        <Grid item xs={4} md={4}>
                            <TextField
                                fullWidth
                                size='small'
                                id="firstName"
                                name='firstName'
                                label="First Name"
                                value={values.firstName}
                                onBlur={(e) => {
                                    handleBlur(e)
                                }}
                                onChange={handleChange}
                                error={!!touched.firstName && !!errors.firstName}
                                helperText=
                                {touched.firstName && errors.firstName && typeof errors.firstName === "string" && errors.firstName}
                                variant='standard'
                                placeholder='Enter First Name'
                                required
                            />
                        </Grid>

                        <Grid item xs={3} md={4}>
                            <TextField
                                fullWidth
                                size='small'
                                id="middleName"
                                name='middleName'
                                label="Middle Name"
                                value={values.middleName}
                                onBlur={(e) => {
                                    handleBlur(e)
                                }}
                                onChange={handleChange}
                                error={!!touched.middleName && !!errors.middleName}
                                helperText=
                                {touched.middleName && errors.middleName && typeof errors.middleName === "string" && errors.middleName}
                                variant='standard'
                                placeholder='Enter Middle Name'

                            />
                        </Grid>

                        <Grid item xs={4} md={4}>
                            <TextField
                                fullWidth
                                size='small'
                                id="lastName"
                                name='lastName'
                                label="Last Name"
                                value={values.lastName}
                                onBlur={(e) => {
                                    handleBlur(e)
                                }}
                                onChange={handleChange}
                                error={!!touched.lastName && !!errors.lastName}
                                helperText=
                                {touched.lastName && errors.lastName && typeof errors.lastName === "string" && errors.lastName}
                                variant='standard'
                                placeholder='Enter Last Name'
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={7} >
                            <TextField
                                fullWidth
                                size='small'
                                id="email"
                                name='email'
                                label="Email"
                                value={values.email}
                                onBlur={(e) => {
                                    handleBlur(e)
                                }}
                                onChange={handleChange}
                                error={!!touched.email && !!errors.email}
                                helperText=
                                {touched.email && errors.email && typeof errors.email === "string" && errors.email}
                                variant='standard'
                                placeholder='Enter Email'
                                required
                            />
                        </Grid>

                        <Grid item xs={5} md={5} >
                            <TextField
                                fullWidth
                                type="tel"
                                size='small'
                                id="phoneNumber"
                                name='phoneNumber'
                                label="Phone Number"
                                value={values.phoneNumber}
                                onBlur={(e) => {
                                    handleBlur(e)
                                }}
                                onChange={handleChange}
                                error={!!touched.phoneNumber && !!errors.phoneNumber}
                                helperText=
                                {touched.phoneNumber && errors.phoneNumber && typeof errors.phoneNumber === "string" && errors.phoneNumber}
                                variant='standard'
                                placeholder='080 1234 5678'
                                required
                            />
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <TextField
                                disabled
                                fullWidth
                                size='small'
                                id="password"
                                name='password'
                                label="Password"
                                value={values.phoneNumber}
                                onBlur={(e) => {
                                    handleBlur(e)
                                }}
                                onChange={handleChange}
                                error={!!touched.phoneNumber && !!errors.phoneNumber}
                                variant='standard'
                                placeholder='Password'
                                required
                            />
                        </Grid>
                        <Grid item xs={3} md={2}>
                            <FormControl
                                variant="standard"
                                size='small'
                                fullWidth required
                            >
                                <InputLabel id="genderLabel">Gender</InputLabel>
                                <Select
                                    name="gender"
                                    placeholder='Gender'
                                    labelId="genderLabel"
                                    id="gender"
                                    value={values.gender}
                                    onChange={handleChange}
                                    label="Gender"
                                    onBlur={handleBlur}

                                >
                                    <MenuItem value="M">Male</MenuItem>
                                    <MenuItem value="F">Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4} md={4}>
                            <TextField
                                fullWidth
                                size='small'
                                id="nitdaID"
                                name='nitdaID'
                                label="NITDA ID"
                                value={values.nitdaID}
                                onBlur={(e) => {
                                    handleBlur(e)
                                }}
                                onChange={handleChange}
                                error={!!touched.nitdaID && !!errors.nitdaID}
                                helperText=
                                {touched.nitdaID && errors.nitdaID && typeof errors.nitdaID === "string" && errors.nitdaID}
                                variant='standard'
                                placeholder='Enter NITDA ID'
                                required
                            />
                        </Grid>

                        <Grid item xs={5} md={6}>
                            <Autocomplete
                                fullWidth
                                id="department-select"
                                defaultValue={DEPARTMENTS_LIST[0]}
                                options={DEPARTMENTS_LIST}
                                value={values.department}
                                getOptionLabel={(option) => option?.label}
                                onChange={(event, newValue) => {
                                    setFieldValue("department", newValue);
                                }}
                                isOptionEqualToValue={(option, value) => {
                                    return option.value === value.value
                                }}
                                renderInput={(params) => {
                                    return (<TextField
                                        {...params}
                                        variant='standard'
                                        label="Department"
                                        placeholder='Select Department'
                                        required
                                        name="department"
                                        aria-required
                                    />)
                                }}
                                size="small"

                            />
                        </Grid >

                        <Grid item xs={12} md={6}>
                            <Autocomplete
                                multiple
                                id="permissions-tags"
                                defaultValue={values.permissions}
                                options={POSSIBLE_PERMISSIONS}
                                getOptionLabel={(option) => option?.label}
                                onChange={(event, newValue) => setFieldValue("permissions", newValue)}
                                isOptionEqualToValue={(option, value) => {
                                    return option.value === value.value
                                }}
                                value={values.permissions}
                                filterSelectedOptions
                                renderInput={(params) => {
                                    return (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Permissions"
                                            placeholder="NYSC Permissions"
                                            required={values.permissions.length === 0}
                                            onBlur={handleBlur}
                                        />
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Autocomplete
                                id="location"
                                size='small'
                                options={OFFICE_LOCATION}
                                defaultValue={OFFICE_LOCATION[0]}

                                getOptionLabel={(option) => option?.label}
                                onChange={(event, newValue) => setFieldValue("location", newValue)}
                                isOptionEqualToValue={(option, value) => {
                                    return option.value === value.value
                                }}
                                value={values.location}
                                filterSelectedOptions
                                renderInput={(params) => {
                                    return (
                                        <TextField
                                            {...params}
                                            required
                                            variant="standard"
                                            label="Location"
                                            placeholder="Location"
                                            onBlur={handleBlur}
                                        />
                                    )
                                }}
                            />
                        </Grid>

                        <Grid item xs={4} md={4}>
                            <TextField
                                fullWidth
                                size='small'
                                id="assignedOffice"
                                name='assignedOffice'
                                label="Assigned Office"
                                value={values.assignedOffice}
                                onBlur={(e) => {
                                    handleBlur(e)
                                }}
                                onChange={handleChange}
                                error={!!touched.assignedOffice && !!errors.assignedOffice}
                                helperText=
                                {touched.assignedOffice && errors.assignedOffice && typeof errors.assignedOffice === "string" && errors.assignedOffice}
                                variant='standard'
                                placeholder='Enter Office'
                            />
                        </Grid>

                        <Grid item xs={4} md={4}>
                            <TextField
                                fullWidth
                                type='date'
                                id="expectedEndDate"
                                name='expectedEndDate'
                                label="End Date"
                                size='small'
                                InputLabelProps={{ shrink: true }}
                                value={values.expectedEndDate}
                                onBlur={(e) => {
                                    handleBlur(e)
                                }}
                                onChange={handleChange}
                                error={!!touched.expectedEndDate && !!errors.expectedEndDate}
                                helperText=
                                {touched.expectedEndDate && errors.expectedEndDate && typeof errors.expectedEndDate === "string" && errors.expectedEndDate}
                                variant='standard'
                            />
                        </Grid>

                        <Grid item xs={6} md={4}>
                            <FormControl
                                variant="standard"
                                size='small'
                                fullWidth required
                            >
                                <InputLabel id="highestQualificationLabel">Highest Qualification</InputLabel>
                                <Select
                                    name="highestQualification"
                                    placeholder='Highest Qualification'
                                    labelId="highestQualificationLabel"
                                    id="highestQualification"
                                    value={values.highestQualification}
                                    onChange={handleChange}
                                    label="Gender"
                                    onBlur={handleBlur}

                                >
                                    <MenuItem value="BSc.">Bachelor of Science</MenuItem>
                                    <MenuItem value="BA">Bachelor of Arts</MenuItem>
                                    <MenuItem value="LLB">Bachelor of Law </MenuItem>
                                    <MenuItem value="HND"> Higher National Diploma</MenuItem>
                                    <MenuItem value="Msc.">Master of Science</MenuItem>
                                    <MenuItem value="BEng.">Bachelor of Engineering</MenuItem>
                                    <MenuItem value="MEng.">Master of Engineering</MenuItem>
                                    <MenuItem value="PhD."> Doctor of Philosophy</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                size='small'
                                id="courseOfStudy"
                                name='courseOfStudy'
                                label="Course Of Study"
                                value={values.courseOfStudy}
                                onBlur={(e) => {
                                    handleBlur(e)
                                }}
                                onChange={handleChange}
                                error={!!touched.courseOfStudy && !!errors.courseOfStudy}
                                helperText=
                                {touched.courseOfStudy && errors.courseOfStudy && typeof errors.courseOfStudy === "string" && errors.courseOfStudy}
                                variant='standard'
                                placeholder="Course Of Study Of Study"
                                required
                            />
                        </Grid>

                        <Grid item xs={6} md={4}>
                            <FormControl
                                variant="standard"
                                size='small'
                                fullWidth
                            >
                                <InputLabel id="cdsDaysLabel">CDS Days</InputLabel>
                                <Select
                                    name="cdsDays"
                                    placeholder='CDS Days'
                                    labelId="cdsDaysLabel"
                                    id="cdsDays"
                                    value={values.cdsDays}
                                    onChange={handleChange}
                                    label="CDS Days"
                                    onBlur={handleBlur}

                                >
                                    <MenuItem value="Monday">Monday</MenuItem>
                                    <MenuItem value="Tuesday">Tuesday</MenuItem>
                                    <MenuItem value="Wednesday">Wednesday</MenuItem>
                                    <MenuItem value="Thursday"> Thursday</MenuItem>
                                    <MenuItem value="Friday"> Friday</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} md={4}>
                            <FormControl
                                variant="standard"
                                size='small'
                                fullWidth required
                            >
                                <InputLabel id="classOfDegreeLabel">Class of Degree</InputLabel>
                                <Select
                                    name="classOfDegree"
                                    placeholder='Class Of Degree'
                                    labelId="classOfDegreeLabel"
                                    id="classOfDegree"
                                    value={values.classOfDegree}
                                    onChange={handleChange}
                                    label="Class of Degree"
                                    onBlur={handleBlur}

                                >
                                    <MenuItem value="First Class">First Class</MenuItem>
                                    <MenuItem value="Second Class Upper">Second Class Upper</MenuItem>
                                    <MenuItem value="Second Class Lower">Second Class Lower</MenuItem>
                                    <MenuItem value="Third Class"> Third Class</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>


                        {/*




                        NYSC ONLY FIELDS:




                        */}

                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                size='small'
                                id="callUpNumber"
                                name='callUpNumber'
                                label="Call Up Number"
                                value={values.callUpNumber}
                                onBlur={(e) => {
                                    handleBlur(e)
                                }}
                                onChange={handleChange}
                                error={!!touched.callUpNumber && !!errors.callUpNumber}
                                helperText=
                                {touched.callUpNumber && errors.cdsDays && typeof errors.callUpNumber === "string" && errors.callUpNumber}
                                variant='standard'
                                placeholder="NYSC/CU/2023/4321"
                            />
                        </Grid>

                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                size='small'
                                id="stateCode"
                                name='stateCode'
                                label="State Code"
                                value={values.stateCode}
                                onBlur={(e) => {
                                    handleBlur(e)
                                }}
                                onChange={handleChange}
                                error={!!touched.stateCode && !!errors.stateCode}
                                helperText=
                                {touched.stateCode && errors.cdsDays && typeof errors.stateCode === "string" && errors.stateCode}
                                variant='standard'
                                placeholder="FCT/23C/9302"
                            />
                        </Grid>

                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                size='small'
                                id="LGIContact"
                                name='LGIContact'
                                label="LGI Contact"
                                value={values.LGIContact}
                                onBlur={(e) => {
                                    handleBlur(e)
                                }}
                                onChange={handleChange}
                                error={!!touched.LGIContact && !!errors.LGIContact}
                                helperText=
                                {touched.LGIContact && errors.cdsDays && typeof errors.LGIContact === "string" && errors.LGIContact}
                                variant='standard'
                                placeholder="08123456789"
                            />
                        </Grid>

                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                size='small'
                                id="zonalInspectorContact"
                                name='zonalInspectorContact'
                                label="Zonal Inspector Contact"
                                value={values.zonalInspectorContact}
                                onBlur={(e) => {
                                    handleBlur(e)
                                }}
                                onChange={handleChange}
                                error={!!touched.zonalInspectorContact && !!errors.zonalInspectorContact}
                                helperText=
                                {touched.zonalInspectorContact && errors.cdsDays && typeof errors.zonalInspectorContact === "string" && errors.zonalInspectorContact}
                                variant='standard'
                                placeholder="08123456789"
                            />
                        </Grid>
                    </Grid>

                    {/*



                    ACCOUNT FIELDS




                    */}
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                size='small'
                                variant='standard'
                                required
                                id="accountNumber"
                                name='account.accountNumber'
                                label="Account Number"
                                value={values.account.accountNumber}
                                onBlur={(e) => {
                                    getAccountName()
                                    return handleBlur(e)
                                }}
                                onChange={(e) => {
                                    setFieldValue("account.accountNumber", e.target.value)
                                    return handleChange(e)
                                }}
                                error={
                                    Boolean(getIn(touched, "account.accountNumber")
                                        && getIn(errors, "account.accountNumber"))
                                }
                                helperText={getIn(touched, "account.accountNumber") && getIn(errors, "account.accountNumber")}
                                placeholder="Account Number"

                            />
                        </Grid>

                        <Grid item xs={6} md={4}>
                            <Autocomplete
                                id="bankCode"
                                size='small'
                                options={BANKS_LIST}
                                defaultValue={BANKS_LIST[0]}

                                getOptionLabel={(option) => option?.label}
                                onChange={(event, newValue) => setFieldValue("account.bankCode", newValue)}
                                isOptionEqualToValue={(option, value) => {
                                    return option.value === value.value
                                }}
                                value={values.account.bankCode}
                                onBlur={
                                    (e) => {
                                        getAccountName()
                                        return handleBlur(e)
                                    }
                                }
                                filterSelectedOptions
                                renderInput={(params) => {
                                    return (
                                        <TextField
                                            {...params}
                                            required
                                            variant="standard"
                                            label="Bank Name"
                                            placeholder="Select Bank"
                                            onBlur={(e) => {
                                                handleBlur(e)
                                            }}
                                            name="account.bankCode"
                                        />
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                size='small'
                                variant='standard'
                                disabled
                                required
                                id="accountName"
                                name='account.accountName'
                                label="Account Name"
                                value={values.account.accountName}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={
                                    Boolean(getIn(touched, "account.accountNumber")
                                        && getIn(touched, "account.bankCode")
                                        && !getIn(values, "account.accountName")
                                        && getIn(errors, "account.accountName"))
                                }
                                helperText={getIn(touched, "account.accountName") && getIn(errors, "account.accountName")}
                                placeholder="Account Name"
                            />
                        </Grid>

                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item>
                            <TextField
                                fullWidth
                                size='small'
                                variant='standard'
                                required

                                id="nextOfKin.name"
                                name='nextOfKin.name'
                                label="Next Of Kin Name"
                                value={values.nextOfKin.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={
                                    Boolean(getIn(touched, "nextOfKin.name") && getIn(errors, "nextOfKin.name"))
                                }
                                helperText=
                                {getIn(touched, "nextOfKin.name") && getIn(errors, "nextOfKin.name")}
                                placeholder="Next Of Kin Name"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                size='small'
                                variant='standard'
                                type="tel"
                                required

                                id="nextOfKin.phoneNumber"
                                name='nextOfKin.phoneNumber'
                                label="Next Of Kin Phone Number"
                                value={values.nextOfKin.phoneNumber}
                                onBlur={(e) => {
                                    handleBlur(e)
                                }}
                                onChange={handleChange}
                                error={Boolean(getIn(touched, "nextOfKin.phoneNumber") && getIn(errors, "nextOfKin.phoneNumber"))}
                                helperText=
                                {getIn(touched, "nextOfKin.phoneNumber") && getIn(errors, "nextOfKin.phoneNumber")}
                                placeholder="Next Of Kin Phone Number"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                size='small'
                                variant='standard'

                                id="nextOfKin.email"
                                name='nextOfKin.email'
                                label="Next Of Kin Email"
                                value={values.nextOfKin.email}
                                onBlur={(e) => {
                                    handleBlur(e)
                                }}
                                onChange={handleChange}
                                error={Boolean(getIn(touched, "nextOfKin.email") && getIn(errors, "nextOfKin.email"))}
                                helperText={getIn(touched, "nextOfKin.email") && getIn(errors, "nextOfKin.email")}
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                fullWidth
                                size='small'
                                variant='standard'
                                required

                                id="nextOfKin.relationship"
                                name='nextOfKin.relationship'
                                label="Next Of Kin Relationship"
                                value={values.nextOfKin.relationship}
                                onBlur={(e) => {
                                    handleBlur(e)
                                }}
                                onChange={handleChange}
                                error={Boolean(getIn(touched, "nextOfKin.relationship") && getIn(errors, "nextOfKin.relationship"))}
                                helperText=
                                {getIn(touched, "nextOfKin.relationship") && getIn(errors, "nextOfKin.relationship")}
                                placeholder="Next Of Kin Relationship"
                            />
                        </Grid>

                    </Grid>
                    <Grid container justifyContent={"center"}>
                        <Grid item xs={8} md={6} >
                            <Button
                                fullWidth
                                color="secondary"
                                size="small"
                                type="submit"
                                value="Create NYSC"
                                sx={{
                                    borderRadius: "0",
                                    fontWeight: "bold",
                                    fontSize: "1rem",
                                    backgroundColor: colors.green[100],
                                    color: colors.gray[900],
                                    "&:hover": {
                                        backgroundColor: colors.green[900],
                                        color: colors.gray[100],
                                    }

                                }}

                            >Create NYSC</Button>
                        </Grid>
                    </Grid>

                </Stack>
            )

        }}

        </Formik>
    )
}

export default CreateNysc