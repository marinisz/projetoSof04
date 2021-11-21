import { Instituicao, Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const dataSeed = [
    {
        nome: 'PUC-Liberdade',
        cnpj: '35767091000170',
        alunos: [],
        cursos: [
            {
                nome: 'Engenharia de Software',
            },
            {
                nome: 'Jogos Digitais',
            },
            {
                nome: 'Ciência da Computação',
            },
        ],
        departamentos: [
            {
                nome: 'Ciências Exatas',
                professores: [
                    {
                        nome: 'José',
                        cpf: '20508059003',
                    },
                    {
                        nome: 'Lesandro',
                        cpf: '78050444066',
                    },
                ],
            },
            {
                nome: 'Ciências Socials',
                professores: [
                    {
                        nome: 'Camila',
                        cpf: '69260299039',
                    },
                    {
                        nome: 'Ivre',
                        cpf: '34062693038',
                    },
                ],
            },
        ],
    },
    {
        nome: 'PUC-Coração',
        cnpj: '48623243000102',
        alunos: [],
        cursos: [
            {
                nome: 'Engenharia da Computação',
            },
            {
                nome: 'Sistema da Computação',
            },
            {
                nome: 'Ciência da Computação',
            },
        ],
        departamentos: [
            {
                nome: 'Ciências Exatas',
                professores: [
                    {
                        nome: 'Camila',
                        cpf: '89876027026',
                    },
                    {
                        nome: 'Ivre',
                        cpf: '24410909096',
                    },
                ],
            },
            {
                nome: 'Ciências Socials',
                professores: [
                    {
                        nome: 'Camila',
                        cpf: '15275314060',
                    },
                    {
                        nome: 'Ivre',
                        cpf: '46348424081',
                    },
                ],
            },
        ],
    },
];

async function main() {
    for (let i = 0; i < dataSeed.length; i++) {
        const data = dataSeed[i];
        await prisma.instituicao.create({
            data: {
                cnpj: data.cnpj,
                nome: data.nome,
                alunos: {
                    create: data.alunos,
                },
                cursos: {
                    create: data.cursos,
                },
                departamentos: {
                    create: data.departamentos.map(dep => ({
                        nome: dep.nome,
                        professores: {
                            create: dep.professores
                        },
                    })),
                },
            },
        });
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
