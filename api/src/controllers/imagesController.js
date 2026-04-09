const prisma = require("../lib/prisma");

module.exports = {
    getAllImages:async(req,res, next) => {
        try {
            const images = await prisma.image.findMany();
            res.json(images);
        } catch (err) {
            next(err)
        }
    },

    getImage: async (req, res, next) => {
        try {
            const image = await prisma.image.findUnique({where: { id: parseInt(req.params.id) },include: {characters: {select: { id: true, name: true }}}});
            res.json(image);
        } catch (err) {
            next(err)
        }
    },


    checkClick: async (req, res, next) => {
        try {
            const {x,y} = req.body
            const {characterId} = req.body
            const cord = await prisma.character.findUnique({ where: { id: parseInt(characterId) } })
            const minDist = 100;
            const isCorrect = Math.abs(x - cord.x) < minDist && Math.abs(y - cord.y) < minDist;
            res.json(isCorrect)
        } catch(err) {
            next(err)
        }
    }

}