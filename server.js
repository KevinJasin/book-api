import express from "express";
import { PrismaClient } from '@prisma/client';

const PORT = 3000;
const app = express();
const prisma = new PrismaClient();




app.get("/books", async (request, response) => {
    try {
        const books = await prisma.books.findMany();
        console.log(books)
        response.status(200).json(books);
    } catch (error) {
        response.status(404).send({
            message: "Midagi on katki",
            error,
        });
    }
});



app.get("/books/:id", async (request, response) => {

    const book = await prisma.books.findUnique({

        where: {
            id: Number(request.params.id),
        },
    });

    console.log(book)

    try {
        
        const book = await prisma.books.findUnique({

            where: {
                id: Number(request.params.id),
            },
        });

        console.log(book)
    
        response.status(200).json(book);
    } catch (error) {
        response.status(404).send({
            message: "Midagi on katki",
            error,
        });
    }
});



app.post("/books", async (request, response) => {
    try {
        const newBook = await prisma.books.create({
            data: { ...request.body },
        });

        response.status(200).json(newBook);

    } catch (error) {
        response.status(404).send({
            message: "Midagi on katki",
            error,
        });
    }
});







app.delete("/books/:id", async (request, response) => {
    try {
        const deletedBook = await prisma.books.delete({
            where: {
                id: Number(request.params.id),
            },
        });

        response.status(200).json(deletedBook);

    } catch (error) {
        response.status(404).send({
            message: "Midagi on katki",
            error,
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});






