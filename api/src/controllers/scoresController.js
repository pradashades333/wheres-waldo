const prisma = require("../lib/prisma");

module.exports = {
    getLeaderboard:async(req,res, next) => {
        try {
            const leader = await prisma.score.findMany({where: { imageId: parseInt(req.params.imageId) },orderBy: { time: 'asc' }})
            res.json(leader)
        } catch (err) {
            next(err)
        }
    },

    saveScore:async(req,res, next) => {
        try {
            const {playerName, time} = req.body
            const {imageId} = req.params
            const score = await prisma.score.create({data: { playerName, time, imageId: parseInt(imageId) }})
            res.json(score)
        } catch(err){
            next(err)
        }
    }

}