import { faker, th } from "@faker-js/faker";
import { ObjectId, model } from "mongoose";
import { Staff, Account, NextOfKin, Nysc, Intern, Siwes } from "../models";
import { ALL_DEPT, DEFAULT_PERMISSION, DEPARTMENT_PERMISSION, INTERNSHIP_STATUS, QUALIFICATION, CLASS_OF_DEGREE } from "../config/data";
import { IIntern, INysc, ISiwes, IStaff } from "models";




type Collections = Array<"Staff" | "Intern" | "Siwes" | "Nysc">
type CreateIntern = Omit<IIntern, "_id" | "comparePassword" | "startPassResetFlow" | "save">
type CreateNysc = Omit<INysc, "_id" | "comparePassword" | "startPassResetFlow" | "save">
type createStaff = Omit<IStaff, "_id" | "comparePassword" | "startPassResetFlow" | "save">
type createSiwes = Omit<ISiwes, "_id" | "comparePassword" | "startPassResetFlow" | "save">

const FREQ = 2500


const createStaff = async (number: number = FREQ) => {
    const newStaff = []
    for (let i = 0; i < number; i++) {
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const active = [true, false][Math.floor(Math.random() * 2)]
        newStaff.push({
            firstName: firstName,
            lastName,
            email: faker.internet.email(),
            nitdaID: faker.string.alphanumeric({ length: 5, casing: "upper" }),
            role: "Staff",
            permissions: DEPARTMENT_PERMISSION,
            department: faker.helpers.arrayElement(ALL_DEPT),
            password: firstName,
            active,
            deleted: !active,
            deletedOn: !active ? faker.date.past() : null,
            jobTitle: faker.person.jobTitle(),
            location: faker.location.city(),
        })
    }
    await Staff.create(newStaff)
}
const createIntern = async (number: number = FREQ) => {
    const newIntern: CreateIntern[] = []
    for (let i = 0; i < number; i++) {
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const active = [true, false][Math.floor(Math.random() * 2)]
        const onPayroll = [true, false][Math.floor(Math.random() * 2)]
        const internID = faker.string.hexadecimal({ length: 24, casing: "lower" }).slice(2)
        const internSchema = "Intern"
        const account = await new Account({
            bankName: faker.company.name(),
            accountNumber: faker.finance.accountNumber(10),
            bankCode: faker.string.numeric({ length: 3 }),
            intern: internID,
            internSchema

        }).save()

        const nextOfKin = await new NextOfKin({
            intern: internID,
            internSchema,
            phoneNumber: faker.phone.number(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
        }).save()

        newIntern.push({
            firstName: firstName,
            lastName,
            email: faker.internet.email(),
            nitdaID: faker.string.alphanumeric({ length: 5, casing: "upper" }),
            role: "Intern",
            permissions: DEFAULT_PERMISSION,
            department: faker.helpers.arrayElement(ALL_DEPT),
            password: firstName,
            active,
            deleted: !active,
            deletedOn: !active ? faker.date.past() : undefined,
            highestQualification: faker.helpers.arrayElement(QUALIFICATION),
            gender: faker.helpers.arrayElement(["M", "F"]),
            phoneNumber: faker.phone.number(),
            assignedOffice: faker.company.name(),
            status: faker.helpers.arrayElement(INTERNSHIP_STATUS),
            expectedEndDate: faker.date.future(),
            startDate: faker.date.past(),
            onPayroll,
            location: faker.location.city(),
            dateAddedOnPayroll: onPayroll ? faker.date.past() : undefined,
            schoolOfStudy: faker.company.name(),
            courseOfStudy: faker.person.jobArea(),
            account: account._id as string | ObjectId,
            nextOfKin: nextOfKin._id as string | ObjectId,
            changedPassword: active
        })
    }
    await Intern.create(newIntern)
}

const createNysc = async (number: number = FREQ) => {
    const newNysc: CreateNysc[] = []
    for (let i = 0; i < number; i++) {
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const active = [true, false][Math.floor(Math.random() * 2)]
        const onPayroll = [true, false][Math.floor(Math.random() * 2)]
        const internID = faker.string.hexadecimal({ length: 24, casing: "lower" }).slice(2)
        const internSchema = "Nysc"

        const account = await new Account({
            bankName: faker.company.name(),
            accountNumber: faker.finance.accountNumber(10),
            bankCode: faker.string.numeric({ length: 3 }),
            intern: internID,
            internSchema

        }).save()

        const nextOfKin = await new NextOfKin({
            intern: internID,
            internSchema,
            phoneNumber: faker.phone.number(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
        }).save()

        newNysc.push({
            firstName: firstName,
            lastName,
            email: faker.internet.email(),
            nitdaID: faker.string.alphanumeric({ length: 5, casing: "upper" }),
            role: "Intern",
            permissions: DEFAULT_PERMISSION,
            department: faker.helpers.arrayElement(ALL_DEPT),
            password: firstName,
            active,
            deleted: !active,
            deletedOn: !active ? faker.date.past() : undefined,
            highestQualification: faker.helpers.arrayElement(QUALIFICATION),
            gender: faker.helpers.arrayElement(["M", "F"]),
            phoneNumber: faker.phone.number(),
            assignedOffice: faker.company.name(),
            status: faker.helpers.arrayElement(INTERNSHIP_STATUS),
            expectedEndDate: faker.date.future(),
            startDate: faker.date.past(),
            onPayroll,
            location: faker.location.city(),
            dateAddedOnPayroll: onPayroll ? faker.date.past() : undefined,
            schoolOfStudy: faker.company.name(),
            courseOfStudy: faker.person.jobArea(),
            account: account._id as string | ObjectId,
            nextOfKin: nextOfKin._id as string | ObjectId,
            changedPassword: active,
            stateCode: faker.location.state(),
            callUpNumber: faker.string.numeric({ length: 10 }),
            classOfDegree: faker.helpers.arrayElement(CLASS_OF_DEGREE),
            cdsDay: faker.helpers.arrayElement(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]),
            LGIContact: [faker.phone.number(), faker.internet.email({ allowSpecialCharacters: true })][Math.floor(Math.random() * 2)],
            zonalInspectorContact: [faker.phone.number(), faker.internet.email({ allowSpecialCharacters: true })][Math.floor(Math.random() * 2)],
        })
    }
    await Nysc.create(newNysc)
}

const createSiwes = async (number: number = FREQ) => {
    const newSiwes: createSiwes[] = []
    for (let i = 0; i < number; i++) {
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const active = [true, false][Math.floor(Math.random() * 2)]
        const onPayroll = [true, false][Math.floor(Math.random() * 2)]
        const internID = faker.string.hexadecimal({ length: 24, casing: "lower" }).slice(2)
        const internSchema = "Siwes"
        const account = await new Account({
            bankName: faker.company.name(),
            accountNumber: faker.finance.accountNumber(10),
            bankCode: faker.string.numeric({ length: 3 }),
            intern: internID,
            internSchema

        }).save()

        const nextOfKin = await new NextOfKin({
            intern: internID,
            internSchema,
            phoneNumber: faker.phone.number(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
        }).save()

        newSiwes.push({
            firstName,
            lastName,
            email: faker.internet.email(),
            nitdaID: faker.string.alphanumeric({ length: 5, casing: "upper" }),
            role: "Intern",
            permissions: DEFAULT_PERMISSION,
            department: faker.helpers.arrayElement(ALL_DEPT),
            password: firstName,
            active,
            deleted: !active,
            deletedOn: !active ? faker.date.past() : undefined,
            highestQualification: faker.helpers.arrayElement(QUALIFICATION),
            gender: faker.helpers.arrayElement(["M", "F"]),
            phoneNumber: faker.phone.number(),
            assignedOffice: faker.company.name(),
            status: faker.helpers.arrayElement(INTERNSHIP_STATUS),
            expectedEndDate: faker.date.future(),
            startDate: faker.date.past(),
            onPayroll,
            location: faker.location.city(),
            dateAddedOnPayroll: onPayroll ? faker.date.past() : undefined,
            schoolOfStudy: faker.company.name(),
            courseOfStudy: faker.person.jobArea(),
            account: account._id as string | ObjectId,
            nextOfKin: nextOfKin._id as string | ObjectId,
            changedPassword: active,
            schoolContact: [faker.phone.number(), faker.internet.email({ allowSpecialCharacters: true })][Math.floor(Math.random() * 2)],
            schoolID: faker.string.alphanumeric({ length: 10, casing: "upper" }),
        })
    }
    await Siwes.create(newSiwes)
}


const createData = {
    Staff: createStaff,
    Nysc: createNysc,
    Intern: createIntern,
    Siwes: createSiwes,
}



export const createDummyData = async (collections: Collections) => {
    for (const collection of collections) {
        try {
            const existingCollectionCount = await model(collection).countDocuments({})
            if (existingCollectionCount < FREQ)
                await createData[collection](FREQ - existingCollectionCount)
        } catch (err) {
            throw err
        }

    }
}