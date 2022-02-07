import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getProductTags(){
    await prisma.$connect()
    const productTags = await prisma.product_tag.findMany();
    prisma.$disconnect();
    return productTags;
}