import { faker } from '@faker-js/faker';
import { ADMIN_CREDENTIALS, TEST_ENV } from '../config';
import { IStaff } from '../types/models';
import { Staff } from '../models';

// Declaring a type for instantiating admin for DEV and PROD ENV
type CreateAdmin = Omit<IStaff, "_id" | "comparePassword" | "startPassResetFlow" | "save">

let admin: CreateAdmin
admin = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName("male"),
    role: "Staff",
    permissions: ["admin"],
    email: faker.internet.email(),
    nitdaID: faker.string.alphanumeric({ length: 5, casing: "upper" }),
    active: true,
    department: "HR",
    password: "test1234",
    deleted: false,
    deletedOn: undefined,
    changedPassword: true,
    jobTitle: faker.person.jobTitle(),
    location: faker.location.city(),

}
if (!TEST_ENV) {
    if (Object.values(ADMIN_CREDENTIALS).every(item => item.trim().length))
        admin = { ...admin, ...ADMIN_CREDENTIALS }
    else {
        throw new Error("Missing Admin credentials in prod environment")
    }
}

export const createAdminAcct = async (adminInfo: CreateAdmin = admin) => {
    const existingAdmin = await Staff.findOne({ $or: [{ email: adminInfo.email, deleted: false, active: true }, { active: true, deleted: false }, { permissions: { $elemMatch: "admin" }, active: true, deleted: false }] })
    if (existingAdmin) {
        return "Admin already exists"
    }

    const newAdmin = await new Staff(adminInfo).save()
    if (!newAdmin) {
        throw new Error("Admin was not created")
    }
}

