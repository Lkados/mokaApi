import {PrismaClient} from '@prisma/client';
import {Request, Response} from 'express';


const prisma = new PrismaClient();


export async function getArticles(req: Request, res: Response) {
    await prisma.article
      .findMany({
        orderBy: {
          id: "asc"
        }
      })
      .then((result) => {
        if (result === null) {
          return res.status(201).json({
            message: "aucun résultat",
          });
        }
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res.status(404).json({
          message: "oups une erreur est survenue",
        });
      });
}

export async function getArticle(req: Request, res: Response) {
    // const users = await prisma.users.findMany({})
    const articleId: number = Number(req.params.id);
    await prisma.article.findUnique({
        where: {id: articleId}
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

export async function createArticle(req: Request, res: Response) {
    const articleExist = await prisma.article.findFirst({
        where: {
            title: req.body.title
        }
    })
    let articleData: any = {
        title: req.body.title,
        subHead: req.body.subHead,
        contents: req.body.contents,
        text : req.body.text,
        image : req.body.image,
        background:req.body.background,
        comments : req.body.comments,
        map : req.body.map,
        category_id : req.body.category_id,
        authorId : req.body.authorId
    };
    
    if (!articleExist) {
        await prisma.article.create({
            data: articleData,
        }).then(result => {
            return res.status(200).json({
                message: 'Article crée avec succès'
            })
        }).catch(err => {
            return res.status(404).json(err)
        })
    }else{
        return res.status(200).json({
            Message: 'veuillez vérifier les champs'
        })
    }
}

export async function deleteArticle(req: Request, res:Response) {
    const articleId: number = Number(req.params.id);
    const articleExist = await prisma.article.findFirst({
        where: {
            id: articleId
        }
    })
    if (articleExist){
        await prisma.article.delete({
            where: {
                id: articleId
            }
        }).then(result => {
            return res.status(200).json({
                message: 'Article supprimé'
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
export async function updateArticle(req: Request, res: Response) {
  const articleId: number = Number(req.params.id);
  const articleExist = await prisma.article.findFirst({
    where: {
      id: articleId,
    },
  });
  if (articleExist) {

      let articleData: any = {
        title: req.body.title,
        subHead: req.body.subHead,
        contents: req.body.contents,
        text : req.body.text,
        image : req.body.image,
        background:req.body.background,
        comments : req.body.comments,
        map : req.body.map,
        category_id : req.body.category_id,
        authorId : req.body.authorId
    };
    await prisma.article
      .update({ where: { id: articleId }, data: articleData })
      .then((result: any) => {
        return res.status(200).json({
          message: "Article modifié",
        });
      })
      .catch((err: any) => {
        return res.status(404).json(err);
      });
  } else {
    return res.status(200).json({
      Message: "l'article n'existe pas",
    });
  }
}
/*
export async function setCategory(req: Request, res:Response){
    
    let newData: any = {
        
        articleId : req.body.articleId,
        categoryId : req.body.categoryId,
        assignedBy : req.body.assignedBy
    };
    
    await prisma.categoriesOnArticles.create({
        
        data: newData

    }).then(result => {
        return res.status(200).json({
            message: 'Category ajoutée'
        })
    }).catch(err => {
        return res.status(404).json(err)
    })
    
    
}*/