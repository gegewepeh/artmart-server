const router = require ('express').Router()
const usersRouter = require ('./usersRouter')
const artistsRouter = require ('./artistsRouter')
const ordersRouter = require ('./ordersRouter')
const picturesRouter = require ('./picturesRouter')
const optionsRouter = require ('./optionsRouter')
const commentsRouter = require ('./commentsRouter')
const reviewsRouter = require ('./reviewsRouter')
const ratingsRouter = require ('./ratingsRouter')
const categoryRouter = require('./catRouter')
const chatRouter = require('./chatRouter')

router.get('/', (req, res) => {
    res.status(200).json({ message : "get mARTerialize back end "})
})

router.use (categoryRouter)

router.get('/', (req, res) => {
  res.send('Welcome to mARTerialize Server')
})

router.use (usersRouter)

router.use (artistsRouter)

router.use (ordersRouter)

router.use (picturesRouter)

router.use (optionsRouter)

router.use (commentsRouter)

router.use (reviewsRouter)

router.use (ratingsRouter)

router.use (chatRouter)



module.exports = router