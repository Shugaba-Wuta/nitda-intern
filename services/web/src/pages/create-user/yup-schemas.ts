import * as yup from 'yup';

export const baseUserSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    middleName: yup.string(),
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string().required("Password is required"),
    role: yup.string().required("Role is required"),
    permissions: yup.array().of(yup.object().shape({
        value: yup.string(),
        label: yup.string(),
    })).min(1, "Permissions is required"),
    nitdaID: yup.string().required("NITDA ID is required"),
    department: yup.object().shape({
        value: yup.string(),
        label: yup.string(),
    }).required("Department is required"),
    location: yup.object().shape({
        value: yup.string(),
        label: yup.string(),
    }).required("Location is required"),
})


export const staffSchema = baseUserSchema.shape({
    jobTitle: yup.string().required("Job Title is required"),
})

export const internSchema = baseUserSchema.shape({
    assignedOffice: yup.string(),
    expectedEndDate: yup.date().required("Expected End Date is required"),
    highestQualification: yup.string().required("Highest Qualification is required"),
    gender: yup.string().length(2).required("Gender is required"),
    schoolOfStudy: yup.string().required("School of Study is required"),
    phoneNumber: yup.string().required("Phone Number is required"),
    courseOfStudy: yup.string().required("Course of Study is required"),
    nextOfKin: yup.object().shape({
        name: yup.string().required("Next of Kin Name is required"),
        email: yup.string().email("Invalid email address"),
        phoneNumber: yup.string().required("Next of Kin Phone Number is required"),
        relationship: yup.string().required("Next of Kin Relationship is required"),
    }),
    account: yup.object().shape({
        accountNumber: yup.string().required("Account Number is required").min(10, "Account Number must be 10 digits"),
        bankCode: yup.string().required("Bank Code is required"),
        accountName: yup.string().required("Account is not valid"),
    }),
})

export const siwesSchema = internSchema.shape({
    schoolID: yup.string().required("School ID is required"),
    schoolContact: yup.string().required("School Contact is required"),
})

export const nyscSchema = internSchema.shape({
    cdsDays: yup.string(),
    classOfDegree: yup.string().required("Class of Degree is required"),
    callUpNumber: yup.string().required("Call Up Number is required"),
    stateCode: yup.string().required("State Code is required"),
    LGIContact: yup.string(),
    zonalInspectorContact: yup.string(),
})
