import {Prisma, PrismaClient, User} from "@prisma/client";

const prisma = new PrismaClient()

async function createUser(email:string, username: string, password: string, firstName: string, lastName: string): Promise<void> {
    try {
        await prisma.user.create({
            data: {
                username,
                email,
                password,
                firstName,
                lastName
            }
        })
        console.log('User created successfully')
    } catch(error) {
        console.log('Error creating user', error)
    }
}

async function findUser(key: string, value: string | number): Promise<User | null> {
    try {
        const where = {
            [key]: value
        };
        return await prisma.user.findFirst({
            where
        });
    } catch (error) {
        console.error('Error finding user', error);
        return null;
    }
}

async function editUser(userId: number, email:string, username: string, firstName: string, lastName: string): Promise<void> {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                email,
                username,
                firstName,
                lastName
            }
        })
        console.log('User updated successfully')
    } catch(error) {
        console.log('Error updating user', error)
    }
}

export { createUser, findUser, editUser }