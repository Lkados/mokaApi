import {PrismaClient} from '@prisma/client';
import {Request, Response} from 'express';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

export async function login(req: Request, res: Response) {
    const userEmail = req.body.email;
    await prisma.users.findFirst({
        where:
            {email: userEmail}
    }).then(user => {
        if (user === null) {
            return res.status(201).json({
                message: 'veuillez vérifié vos identifient'
            })
        } else {
            bcrypt.compare(req.body.password, user.password, function (err: any, result: any) {
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        id: user.id
                    }, process.env.JWT_SECRET, {expiresIn: '1h'});
                    res.cookie('token', token, {
                        httpOnly: true,
                        maxAge: 1000 * 60 * 60 * 24 * 7
                    });
                    res.status(200).json({
                        message: "Connexion réussi!",
                    });
                } else {
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

export async function getUsers(req: Request, res: Response) {
    await prisma.users.findMany().then(result => {
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

export async function getUser(req: Request, res: Response) {
    // const users = await prisma.users.findMany({})
    const userId: number = Number(req.params.id);
    await prisma.users.findUnique({
        where: {id: userId}
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

export async function createUser(req: Request, res: Response) {
    const userExist = await prisma.users.findFirst({
        where: {
            email: req.body.email
        }
    })
    let userData: any = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        resume: req.body.resume,
        skills: req.body.skills
    };
    if (!userExist) {
        await prisma.users.create({
            data: userData,
        }).then(result => {
            return res.status(200).json({
                message: 'Utilisateur crée avec succès',
            })
        }).catch(err => {
            return res.status(404).json(err)
        })
    }
    return res.status(200).json({
        Message: 'veuillez vérifier les champs'
    })
}

export async function updateUser(req: Request, res: Response) {
    let userToUpdate = {
        email: req.body.email,
        oldpassword: req.body.oldpassword,
        password: req.body.password
    }
    const getTheUser = await prisma.users.findFirst({
        where: {
            email: userToUpdate.email
        }
    }).then(result => {
        return result
    })
    const isOldPassValid = bcrypt.compose(userToUpdate.oldpassword,)

}

