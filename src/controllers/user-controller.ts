import {PrismaClient} from '@prisma/client';
import {Request, Response} from 'express';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

export async function login(req: Request, res: Response) {
    const userEmail = req.body.email;
    await prisma.user.findFirst({
        where:
            {email: userEmail}
    }).then(user => {
        
        if (user === null) {
            return res.status(401).json({
                message: 'veuillez vérifier vos identifiants'
            })
        } else {
            
            bcrypt.compare(req.body.password, user.password, function (err: any, result: any) {
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        id: user.id
                    }, process.env.JWT_SECRET, 
                    {expiresIn: '1h'});
                    res.cookie('token', token, {
                        httpOnly: true,
                        maxAge: 1000 * 60 * 60 * 24 * 7,
                        
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
    
    await prisma.user.findMany().then(result => {
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

export async function getUser(req: Request, res: Response) {
    
    const userId: number = Number(req.params.id);
    await prisma.user.findUnique({
        where: {id: userId}
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

export async function createUser(req: Request, res: Response) {
    
    const userExist = await prisma.user.findFirst({
        where: {
            email: req.body.email
        }
    })
    
    let userData: any = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        roleId: req.body.roleId,
        social_media : req.body.social_media
    };
    
    if (!userExist) {
        await prisma.user.create({
            data: userData,
        }).then(result => {
            return res.status(200).json({
                Message: 'Utilisateur crée avec succès',
            })
        }).catch(err => {
            return res.status(404).json(err)
        })
    }else {
        return res.status(200).json({
            Message: "un utilisateur est déjà enregistré avec cet email"
        })
    }
}

export async function updateUserPassword(req: Request, res: Response) {
    
    let userToUpdate = {
        email: req.body.email,
        oldpassword: req.body.oldpassword,
        password: req.body.password
    }
    const getTheUser = await prisma.user.findFirst({
        where: {
            email: userToUpdate.email
        }
    });
    if (getTheUser === null) {
        return res.status(201).json({
            message: 'email non reconnu'
        })
    } else {
        
        // vérif de l'ancien MDP
        
        const match = await bcrypt.compare(req.body.oldpassword, getTheUser.password);
        
        if (match) {
          
          const updateUser = await prisma.user
            .update({
              where: {
                email: userToUpdate.email,
              },
              data: {
                password: bcrypt.hashSync(userToUpdate.password, 10),
              },
            })
            .then((result) => {
              return res.status(200).json({
                message: "UserPassword updated",
              });
            })
            .catch((err) => {
              return res.status(404).json(err);
            });
        } else {
          
          return res.status(201).json({
            message: 'ancien MDP non correct'
            }); 
        }
    }
    
}

export async function deleteUser(req: Request, res:Response) {
    const userId: number = Number(req.params.id);
    const userExist = await prisma.user.findFirst({
        where: {
            id: userId
        }
    })
    if (userExist){
        await prisma.user.delete({
            where: {
                id: userId
            }
        }).then(result => {
            return res.status(200).json({
                message: 'User deleted'
            })
        }).catch(err => {
            return res.status(404).json(err)
        })
    }else{
        return res.status(200).json({
            Message: "l'article n'existe pas"
        })
    }
}