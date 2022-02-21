import {PrismaClient} from '@prisma/client';
import {Request, Response} from 'express';


const prisma = new PrismaClient();


export async function getRoles(req: Request, res: Response) {
    await prisma.role.findMany().then(result => {
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

export async function getRole(req: Request, res: Response) {
    
    const roleId: number = Number(req.params.id);
    await prisma.role.findUnique({
        where: {id: roleId}
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

export async function createRole(req: Request, res: Response) {
    
    let roleData: any = {
        textRole : req.body.textRole,
        userId : req.body.userId
    };
    
    await prisma.role.create({
        data: roleData,
    }).then(result => {
        return res.status(200).json({
            message: 'Ajout de role effectué'
        })
    }).catch(err => {
        return res.status(404).json(err)
    })
    
}

export async function deleteRole(req: Request, res:Response) {
    const roleId: number = Number(req.params.id);
    const roleExist = await prisma.role.findFirst({
        where: {
            id: roleId
        }
    })
    if (roleExist){
        await prisma.role.delete({
            where: {
                id: roleId
            }
        }).then(result => {
            return res.status(200).json({
                message: 'role supprimé'
            })
        }).catch(err => {
            return res.status(404).json(err)
        })
    }else{
        return res.status(200).json({
        Message: "le role n'existe pas"
    })
}
}
