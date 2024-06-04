import { PrismaClient, Prisma } from '@prisma/client'
import { client_seed } from './seeder'
const prisma = new PrismaClient()


async function main() {
    for(const client_s of client_seed){
        await prisma.client.create({
            data: client_s,
            include: {
                partnerships: {
                    include: {
                        partner: {
                            include: {
                                EDI_documents: {
                                    include: {
                                        structure: true
                                    },
                                },
                            },
                        },
                        uploaded_documents: {
                            include: {
                                errors: true,
                            },
                        },
                    },
                },
            }
        })
    }
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
})