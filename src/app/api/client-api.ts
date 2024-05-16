import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function fetchAllClients() {
    const clients = await prisma.client.findMany();
    if(!clients){
        throw new Error("Failed to fetch data");
    }
    return clients;
}

export async function fetchClientById(id:string) {
    const clients = await prisma.client.findUnique({
        where: {id: id}
    });
    if(!clients){
        throw new Error("Failed to fetch data");
    }
    return clients;
}

export async function createClient(name:string) {
    const client = await prisma.client.create({
        data: {
            name: name,
        }
    })
    return client;
}

export async function updateClient(id:string, name:string) {
    const updateClient = await prisma.client.update({
        where: {
            id: id,
        },
        data: {
            name: name
        }
    })
}
