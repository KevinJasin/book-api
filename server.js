import express from "express";
import { PrismaClient } from '@prisma/client';

const PORT = 3000;
const app = express();
const prisma = new PrismaClient();




app.get("/books", async (rquest, response) => {
    try {
        const books = await prisma.books.findMany();
    response.status(200).json(books);
    } catch (error) {
        response.status(404).send({
            message: "Midagi on katki",
            error,
        });
    }
});

app.listen(PORT, () => {
    console.log("Server listening at port ${PORT}");
});


