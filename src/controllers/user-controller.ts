import {PrismaClient} from '@prisma/client';
import {Request, Response} from 'express';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();



export async function login(req: Request, res: Response){
    const userEmail = req.body.email;
    prisma.user.findFirst({
        where:
            {email: userEmail}
    }).then(user => {
        if (user === null){
            return res.status(201).json({
                message: 'veuillez vérifié vos identifient'
            })
        }else {
            bcrypt.compare(req.body.password, user.password, function (err: any, result: any){
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        usersId: user.id_users,
                        userRole: user.id_role
                    }, process.env.JWT_KEY, function(err: any, token: string){
                        res.status(200).json({
                            message: "Connexion réussi!",
                            token: token
                        });
                    });
                }else{
                    res.status(401).json({
                        message: "Mauvaise combinaison email et mot de passe!",
                    });
                }
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: "Erreur serveur!",
            error: err
        });
    });
}

export async function getUsers(req: any, res: any) {
    // const users = await prisma.users.findMany({})
    await prisma.user.findMany().then(result => {
        if (result === null) {
            return res.status(201).json({
                message: 'aucun résulatat'
            })
        }
        return res.status(200).json(result)
    }).catch(err => {
        return res.status(404).json({
            message: 'oups une erreur est survenue'
        })
    })

}

export async function getUser(req: any, res: any) {
    // const users = await prisma.user.findMany({})
    const id: number = Number(req.params.id);
    await prisma.user.findUnique({
        where: {id_user: id}
    }).then(result => {
        if (result === null) {
            return res.status(201).json({
                message: 'aucun résulatat'
            })
        }
        return res.status(200).json(result)
    }).catch(err => {
        return res.status(404).json({
            message: 'oups une erreur est survenue'
        })
    })

}

export async function createUser(req: any, res: any) {
    const userExist = await prisma.user.findFirst({
        where: {
            email: req.body.email
        }
    })
    if (!userExist) {
        await prisma.user.create({
            data: {
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                id_role: req.body.role,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            }
        }).then(result => {
            return res.status(200).json({
                message: 'success'
            })
        }).catch(err => {
            return res.status(404).json(err)
        })
    }
    return res.status(200).json({
        Message: 'veuillez vérifier vos informations'
    })
}

export default async function updateUser(req: any, res: any){
    let userToUpdate = {
        email: req.body.email,
        oldpassword: req.body.oldpassword,
        password: req.body.password
    }
    const getTheUser = await prisma.user.findFirst({
        where: {
            email: userToUpdate.email
        }
    }).then(result => {
        return result
    })
    const isOldPassValid = bcrypt.compose(userToUpdate.oldpassword, )

}

