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
                partner: {
                  include: {
                    EDI_documents: {
                      include: {
                        structure: true
                      }
                    }
                  }
                },
                uploaded_documents: {
                  include: {
                    errors: true
                  }
                }
              }
            }
          }
        });
        if (!clients) {
          throw new Error("Failed to fetch clients");
        }
        return clients;
      } catch (error) {
        console.error('Error fetching clients:', error);
        throw error; // Rethrow the error after logging it
      }
}

//Read client by id
export async function getClientById(id:string) {
  try{
    const client = await prisma.client.findUnique({
      where: {id: id}
    });
    if(!client){
      throw new Error("Failed to fetch client");
    }
    return client;
  } catch (error) {
    console.log("Error fetching client: ",error);
    throw error;
  }
}

//Get partners from client
export async function getPartnersOfClient(id:string){
  try{
    const client = await prisma.client.findUnique({
      where: {id: id},
      include: {
        partnerships: {
          include: {
            partner: {
              include: {
                EDI_documents: {
                  include: {
                    structure: true
                  }
                }
              }
            },
            uploaded_documents: {
              include: {
                errors: true
              }
            }
          }
        }
      }
    })
    if(!client){
      throw new Error("Failed to fetch client");
    }
    return client;
  } catch(error) {
    console.log("Error fetching client: ", error);
    throw error;
  }
}

//Create client with just the name
export async function createClient(name:string) {
  try{
    const client = await prisma.client.create({
      data: {
        name: name,
      }
    })
    if(!client){
      throw new Error("Failed to create client");
    }
    return client;
  } catch(error) {
    console.log("Error creating client: ",error);
    throw error;
  }
}

//Update client's name
export async function updateClient(id:string, name:string) {
  try{
    const updatedClient = await prisma.client.update({
      where: {
        id: id,
      },
      data: {
        name: name
      }
    });
    if(!updatedClient){
      throw new Error("Failed to update client");
    }
    return updatedClient;
  } catch (error) {
    console.log("Error updating client: ", error);
    throw error;
  }
};

//Delete client by id
export async function deleteClient(id: string){
  try{
    const deletedClient = await prisma.client.delete({
      where: {
        id: id,
      }
    });
    if(!deletedClient){
      throw new Error("Failed to delete client");
    }
    return deletedClient;
  } catch(error) {
    console.log("Error deleting client: ",error);
    throw error;
  }
}