"use strict";
// import {PrismaClient} from '@prisma/client';
// import {Request, Response} from 'express';
// const prisma = new PrismaClient();
// export async function getArticlesOfCategory(req: Request, res:Response){
//     const categoryId: number = Number(req.params.id);
//     await prisma.categoriesOnArticles.findMany({
//         where: {categoryId: categoryId}
//     }).then(result => {
//         if (result === null) {
//             return res.status(201).json({
//                 message: 'aucun résultat'
//             })
//         }
//         return res.status(200).json(result)
//     }).catch(err => {
//         return res.status(404).json({
//             message: 'oups une erreur est survenue'
//         })
//     })
// }
// export async function getArticlesOfCategories(req: Request, res: Response){
//     await prisma.categoriesOnArticles.findMany()
//     .then(result => {
//         if(result === null){
//             return res.status(201).json({
//                 message: 'aucun résultat'
//             })
//         }
//         return res.status(200).json(result)
//     }).catch(err => {
//         return res.status(404).json({
//             message: 'une erreur est survenu'
//         })
//     })
// }
