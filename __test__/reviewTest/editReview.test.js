// decribe PATCH /artists/:artistId/reviews/:reviewId   // updating title commnet or desciption
// -- it success 
// -- it error score empty
// -- it error rating id not found
// -- it error user not login
// -- it error not login user

const request = require('supertest')
const { User, Review, Order, Artist} = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  


describe('PUT /users/:userId/artist/:artistId/orders/:orderId/reviews/:reviewId',function() {
    let userId, reviewId, artistId, access_token, orderId

    beforeAll(done => {
        User.findOne({where : {email : "user@mail.com"}})
        .then(data => {
            userId = data.id

            const payload = {
                id : data.id,
                username : data.username
            }

            access_token = generateToken(payload)


            return Artist.findOne({ where : { email : "user@mail.com"}})
        })
        .then(res => {
            artistId = res.id

            return Order.findOne({ where : { title : "testingforOrder"}})
        })
        then(response => {
            orderId = response.id

            return Review.findOne({ where : { title : "editReviewTesting"}})
        })
        then(rev => {
            reviewId = rev.id

            done()
        })
        .catch(err => {
            console.log(err)
        })

    })

    // ======================== successfull edit reviews ==========================
    it('should status 200, successfull edit reviews' ,function (done) {
        //setup
        const body = {
            title : "edit berhasil"
        }

        //excecute
        request(app) 
        .put(`/users/${userId}/artist/${artistId}/orders/${orderId}/reviews/${reviewId}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('title')
            expect(res.body).toHaveProperty('description')
            expect(typeof res.body.title).toEqual('string')
            expect(typeof res.body.description).toEqual('string')

            done()
        })
    })


    // ======================== error title review empty ==========================
    it('should status 400, error title review empty' ,function (done) {
        //setup
        const body = {
            title : ""
        }

        //excecute
        request(app) 
        .put(`/users/${userId}/artist/${artistId}/orders/${orderId}/reviews/${reviewId}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toEqual('string')

            done()
        })
    })


    // ======================== error reviews id not found ==========================
    it('should status 404, error reviews id not found' ,function (done) {
        //setup
        const id = 9999999

        const data = {
            title : 'tidak berhasil edit'
        }

        //excecute
        request(app) 
        .put(`/users/${userId}/artist/${artistId}/orders/${orderId}/reviews/${id}`)
        .set('access_token', access_token)
        .send(data)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(404)
            expect(typeof res.body).toEqual('Object')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toEqual({
                message : expect.any(String),
            })
            done()
        })
    })


    // ======================== error user not login ==========================
    it('should status 403, error edit user not login' ,function (done) {
        //setup
        const data = {
            title : "tidak berhasil edit"
        }

        //excecute
        request(app) 
        .put(`/users/${userId}/artist/${artistId}/orders/${orderId}/reviews/${reviewId}`)
        .send(data)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(403)
            expect (typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toEqual('string')

            done()
        })
    })
})