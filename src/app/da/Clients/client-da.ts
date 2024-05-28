"use server"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

//Read all clients
export async function getAllClients() {
    try {
        const clients = await prisma.client.findMany({
          include: {
            partnerships: {
              include: {
                partner: true
              }
            }
          }
        });
        if (!clients) {
          throw new Error("Failed to fetch data");
        }
        return clients;
      } catch (error) {
        console.error('Error fetching clients:', error);
        throw error; // Rethrow the error after logging it
      }
}

//Read client by id
export async function getClientById(id:string) {
    const client = await prisma.client.findUnique({
        where: {id: id}
    });
    return client;
}

//Create client with just the name
export async function createClient(name:string) {
    const client = await prisma.client.create({
        data: {
            name: name,
        }
    })
    return client;
}

//Update client's name
export async function updateClient(id:string, name:string) {
    const updatedClient = await prisma.client.update({
        where: {
            id: id,
        },
        data: {
            name: name
        }
    })
    return updatedClient;
};

//Delete client by id
export async function deleteClient(id: string){
    const deletedClient = await prisma.client.delete({
        where: {
            id: id,
        }
    })
    return deletedClient;
}