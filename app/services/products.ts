import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getProducts(){
    await prisma.$connect()
    const products = await prisma.product.findMany();
    prisma.$disconnect();
    return products;
}