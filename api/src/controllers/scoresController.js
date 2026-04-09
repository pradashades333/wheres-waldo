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


}