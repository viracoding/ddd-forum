import { PrismaClient, User } from "@prisma/client";
import { UserSchema } from "./schema";

export class UserController {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createUser(userData: UserSchema.Create): Promise<User> {
        try {
            return await this.prisma.user.create({
                data: userData
            })
        } catch(error) {
            throw error;
        }
    }

    async findUser({key, value}: UserSchema.Find): Promise<User | null> {
        try {
            const where = {
                [key]: value
            };
            return await this.prisma.user.findFirst({
                where
            });
        } catch (error) {
            throw error;
        }
    }

    async editUser(userId: number, userData: UserSchema.Edit): Promise<User> {
        try {
            return await this.prisma.user.update({
                where: { id: userId },
                data: userData
            })
        } catch(error) {
            throw error;
        }
    }
}