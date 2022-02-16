import {PrismaClient} from '@prisma/client';
import {Request, Response} from 'express';


const prisma = new PrismaClient();


export async function getCategories(req: Request, res: Response) {
    await prisma.category.findMany().then(result => {
        if (result === null) {
            return res.status(201).json({
                message: 'aucun résultat'
            })
        }
        return res.status(200).json(result)
    }).catch(err => {
        return res.status(404).json({
            message: 'oups une erreur est survenue'
        })
    })
}

export async function getCategory(req: Request, res: Response) {
    
    const categoryId: number = Number(req.params.id);
    await prisma.category.findUnique({
        where: {id: categoryId}
    }).then(result => {
        if (result === null) {
            return res.status(201).json({
                message: 'aucun résultat'
            })
        }
        return res.status(200).json(result)
    }).catch(err => {
        return res.status(404).json({
            message: 'oups une erreur est survenue'
        })
    })

}

export async function createCategory(req: Request, res: Response) {
    
    let categoryData: any = {
        name : req.body.name
    };
    
    await prisma.category.create({
        data: categoryData,
    }).then(result => {
        return res.status(200).json({
            message: 'Ajout de category effectué'
        })
    }).catch(err => {
        return res.status(404).json(err)
    })
    
    return res.status(200).json({
        Message: 'veuillez vérifier les champs'
    })
}

export async function deleteCategory(req: Request, res:Response) {
    const categoryId: number = Number(req.params.id);
    const categoryExist = await prisma.category.findFirst({
        where: {
            id: categoryId
        }
    })
    if (categoryExist){
        await prisma.category.delete({
            where: {
                id: categoryId
            }
        }).then(result => {
            return res.status(200).json({
                message: 'Catégorie supprimé'
            })
        }).catch(err => {
            return res.status(404).json(err)
        })
    }
    return res.status(200).json({
        Message: "l'article n'existe pas"
    })
}

