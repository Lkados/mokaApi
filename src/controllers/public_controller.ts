import {PrismaClient} from '@prisma/client';
import {Request, Response} from 'express';
const prisma = new PrismaClient();


export async function getAbout(req: Request, res: Response) {
  await prisma.user.findFirst({
    where: {
      id: 1,
    },
  }).then((about) => {
    return res.status(200).json({
      about: about,
    });
  }).catch((err) => {
    return res.status(500).json({
      error: err,
    });
  });
}
