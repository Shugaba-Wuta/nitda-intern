
//Possible values for permissions
export const POSSIBLE_PERMISSIONS = [
    { label: "View NYSC", value: "nysc:read" },
    { label: "View SIWES", value: "siwes:read" },
    { label: "View Interns", value: "intern:read" },
    { label: "View Staff", value: "staff:read" },
    { label: "View Schedule", value: "schedule:read" },

    { label: "Update NYSC", value: "nysc:update" },
    { label: "Update SIWES", value: "siwes:update" },
    { label: "Update Interns", value: "intern:update" },
    { label: "Update Staff", value: "staff:update" },
    { label: "Update Schedule", value: "schedule:update" },

    { label: "Delete NYSC", value: "nysc:delete" },
    { label: "Delete SIWES", value: "siwes:delete" },
    { label: "Delete Interns", value: "intern:delete" },
    { label: "Delete Staff", value: "staff:delete" },
    { label: "Delete Schedule", value: "schedule:delete" },

    { label: "NYSC", value: "nysc" },
    { label: "SIWES", value: "siwes" },
    { label: "Interns", value: "intern" },
    { label: "Staff", value: "staff" },
    { label: "Schedule", value: "schedule" },

    { label: "Admin Permission", value: "admin" },
]

export const INIT_PERMISSIONS = {
    Nysc: [{ label: "View NYSC", value: "nysc:read" },
    { label: "View SIWES", value: "siwes:read" },
    { label: "View Interns", value: "intern:read" },
    { label: "View Staff", value: "staff:read" },
    { label: "View Schedule", value: "schedule:read" },
    { label: "Update NYSC", value: "nysc:update" },
    ],

    Siwes: [{ label: "View NYSC", value: "nysc:read" },
    { label: "View SIWES", value: "siwes:read" },
    { label: "View Interns", value: "intern:read" },
    { label: "View Staff", value: "staff:read" },
    { label: "View Schedule", value: "schedule:read" },
    { label: "Update SIWES", value: "siwes:update" },
    ],

    Intern: [{ label: "View NYSC", value: "nysc:read" },
    { label: "View SIWES", value: "siwes:read" },
    { label: "View Interns", value: "intern:read" },
    { label: "View Staff", value: "staff:read" },
    { label: "View Schedule", value: "schedule:read" },
    { label: "Update Interns", value: "intern:update" },
    ],
    Staff: [
        { label: "NYSC", value: "nysc" },
        { label: "SIWES", value: "siwes" },
        { label: "Interns", value: "intern" },
        { label: "Staff", value: "staff" },
        { label: "Schedule", value: "schedule" },
    ]
}
export const OFFICE_LOCATION = [
    { value: "hq", label: "Head Quarters, Abuja" },
    { value: "annex-abuja", label: "Annex, Abuja" },
    { value: "ondi-abuja", label: "ONDI, Abuja" },
    { value: "ncair-abuja", label: "NCAIR, Abuja" },
    { value: "lagos-zone", label: "Lagos" },
    { value: "kano-zone", label: "Kano" },
    { value: "gombe-zone", label: "Gombe" },
    { value: "port-harcourt-zone", label: "Port Harcourt" },
].sort((a, b) => a.value.localeCompare(b.value))

export const DEPARTMENTS_LIST = [
    { value: "HRA", label: "Human Resources & Administration" },
    { value: "ITIS", label: "IT Infrastructure and Solutions" },
    { value: "CS", label: "Cyber Security" },
    { value: "SGF", label: "Standard Guidelines and Frameworks" },
    { value: "FMC", label: "Finance and Management Control" },
    { value: "CPS", label: "Corporate Planning and Strategy" },
    { value: "EGDR", label: "E-Government Development and Regulation" },
    { value: "DED", label: "Digital Economy Development" },
    { value: "DLCD", label: "Digital Literacy Capacity Development" },
    { value: "R&D", label: "Research and Development" }
].sort((a, b) => a.value.localeCompare(b.value))

export const BANKS_LIST = [
    { "id": "1", "name": "Access Bank", "code": "044" },
    { "id": "2", "name": "Citibank", "code": "023" },
    { "id": "3", "name": "Diamond Bank", "code": "063" },
    { "id": "4", "name": "Dynamic Standard Bank", "code": "" },
    { "id": "5", "name": "Ecobank Nigeria", "code": "050" },
    { "id": "6", "name": "Fidelity Bank Nigeria", "code": "070" },
    { "id": "7", "name": "First Bank of Nigeria", "code": "011" },
    { "id": "8", "name": "First City Monument Bank", "code": "214" },
    { "id": "9", "name": "Guaranty Trust Bank", "code": "058" },
    { "id": "10", "name": "Heritage Bank Plc", "code": "030" },
    { "id": "11", "name": "Jaiz Bank", "code": "301" },
    { "id": "12", "name": "Keystone Bank Limited", "code": "082" },
    { "id": "13", "name": "Providus Bank Plc", "code": "101" },
    { "id": "14", "name": "Polaris Bank", "code": "076" },
    { "id": "15", "name": "Stanbic IBTC Bank Nigeria Limited", "code": "221" },
    { "id": "16", "name": "Standard Chartered Bank", "code": "068" },
    { "id": "17", "name": "Sterling Bank", "code": "232" },
    { "id": "18", "name": "Suntrust Bank Nigeria Limited", "code": "100" },
    { "id": "19", "name": "Union Bank of Nigeria", "code": "032" },
    { "id": "20", "name": "United Bank for Africa", "code": "033" },
    { "id": "21", "name": "Unity Bank Plc", "code": "215" },
    { "id": "22", "name": "Wema Bank", "code": "035" },
    { "id": "23", "name": "Zenith Bank", "code": "057" }
].map((bank) => { return { value: bank.code, label: bank.name } }).sort((a, b) => a.value.localeCompare(b.value))



// Initial Values for all forms

export const userInitVal = {
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    password: "",
    confirmPassword: "",
    nitdaID: "",
    department: DEPARTMENTS_LIST[0],
    location: null
}
export const internInitVal = {
    ...userInitVal,
    assignedOffice: "",
    expectedEndDate: "",
    highestQualification: "",
    gender: "",
    schoolOfStudy: "",
    phoneNumber: "",
    courseOfStudy: "",
    nextOfKin: {
        name: "",
        phoneNumber: "",
        email: "",
        relationship: "",
    },
    account: {
        bankCode: { label: "", value: "" },
        accountNumber: "",
        accountName: "",
        internSchema: "Intern",
    }
}
export const siwesInitVal = {
    ...internInitVal,
    schoolID: "",
    schoolContact: "",
    permissions: INIT_PERMISSIONS.Siwes,
    account: {
        bankCode: { label: "", value: "" },
        accountNumber: "",
        accountName: "",
        internSchema: "Siwes"
    }
}
export const nyscInitVal = {
    ...internInitVal,
    classOfDegree: "",
    callUpNumber: "",
    cdsDays: "",
    stateCode: "",
    LGIContact: "",
    zonalInspectorContact: "",
    permissions: INIT_PERMISSIONS.Nysc,
    account: {
        bankCode: { label: "", value: "" },
        accountNumber: "",
        accountName: "",
        internSchema: "Nysc"
    }

}
export const staffInitVal = {
    ...userInitVal,
    jobTitle: "",
    permissions: INIT_PERMISSIONS.Staff,
}
