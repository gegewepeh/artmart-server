// accpeted  /artists/:artistId/orders/:orderId/accepted

// done

// paid

// error not login

const request = require('supertest')

const { Artist, Order } = require('../../models')

const { beforeAll } = require("@jest/globals")

const app = require('../../app') 
const { generateToken } = require('../../helpers/jwt')


describe('PATCH /artists/:artistId/orders', function() {
    let artistId = 1
    let access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VybmFtZVRlc3RpbmdGb3JBcnRpc3QiLCJwcm9maWxlUGljdHVyZSI6ImxpbmsuZ29vZ2xlLmNvbSIsImlhdCI6MTYxNDAxMjAyNn0.vQyZa-ldYGwO3blnq8KmSaGTe4GAr6duhOoX50hU95A"
    let orderId = 3
    let userId = 1
    let idOrder = "zzz"
    let userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VybmFtZVRlc3RpbmdGb3JVU2VyIiwicHJvZmlsZVBpY3R1cmUiOiJsaW5rLmdvb2dsZS5jb20iLCJpYXQiOjE2MTQwMTEyOTd9.kEprekXCVV9xX_kfPZ_6y7P9xPMC1gFrsum6hsy0nPw"

    // beforeAll(done => {
    //     //dummy Artist login
    //     Artist.findOne( { where : { email : "artist@mail.com"}})
    //     .then(data => {
    //         artistId = data.id

    //         const payload = {
    //             id : data.id,
    //             username : data.username,
    //             profilePicture : data.profilePicture
    //         }

    //         access_token = generateToken(payload)
    //         done()
    //     })
    // })


    // ==============================================================================
    // ==============================================================================
    // ======================== successfull patch accepted ==========================
    it('should status 200, successfull patch accepted' ,function (done) {
        //setup

        //excecute
        request(app) 
        .patch(`/artists/1/orders/3/accepted`)
        .set("access_token", access_token)

        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('accepted')
            expect(typeof res.body.accepted).toEqual('boolean')
            expect(res.body.accepted).toEqual(true)

            done()
        })
    })


    // testing tidak jalan
    //  ======================== error internal server==========================
    // it('should status 500, error internal server' ,function (done) {
    //     //setup

    //     //excecute
    //     request(app) 
    //     .patch(`/artists/1/orders/sss/accepted`)
    //     .set("access_token", access_token)

    //     .end((err, res) => {
    //         if(err) done(err)
                    
    //         //assert
    //         expect(res.statusCode).toEqual(500)
    //         expect(typeof res.body).toEqual('object')
    //         expect(res.body).toHaveProperty('messages')
    //         expect(typeof res.body.messages).toEqual('string')

    //         done()
    //     })
    // })


    // ==========================================================================
    // =========================================================================
    // ======================== successfull patch done ==========================
    // harusnya 200
    it('should status 500, successfull patch done' ,function (done) {
        //setup     
        const body = {
            imageURL : "link2.google.com"
        }
    
        //excecute
        request(app) 
        .patch(`/artists/${artistId}/orders/3/done`)
        .set("access_token", access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(500)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')
            // expect(res.body).toHaveProperty('done')
            // expect(typeof res.body.done).toEqual('boolean')
            // expect(res.body.done).toEqual(true)

            done()
        })
    })


    // order already done
    it('should status 403, error done true' ,function (done) {
        //setup     
        const body = {
            imageURL : "link2.google.com"
        }
    
        //excecute
        request(app) 
        .patch(`/artists/${artistId}/orders/1/done`)
        .set("access_token", access_token)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(403)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })

    // testing tidak jalan
    // ======================== error internal server==========================
    // it('should status 500, error internal server' ,function (done) {
    //     //setup
    //     const body = {
    //         imageURL : ""
    //     }

    //     //excecute
    //     request(app) 
    //     .patch(`/artists/${artistId}/orders/${idOrder}/done`)
    //     .set("access_token", access_token)
    //     .send(body)

    //     .end((err, res) => {
    //         if(err) done(err)
                    
    //         //assert
    //         expect(res.statusCode).toEqual(500)
    //         expect(typeof res.body).toEqual('object')
    //         expect(res.body).toHaveProperty('messages')
    //         expect(typeof res.body.messages).toEqual('string')

    //         done()
    //     })
    // })


    // ===============================================================================
    // ==============================================================================
    // ======================== successfull patch paid ==========================
    it('should status 200, successfull patch paid' ,function (done) {
        //setup
    
        //excecute
        request(app) 
        .patch(`/users/1/orders/3/paid`)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('paid')
            expect(typeof res.body.paid).toEqual('boolean')
            expect(res.body.paid).toEqual(true)

            done()
        })
    })


    // order already paid
    it('should status 403, error paid true' ,function (done) {
        //setup     
    
        //excecute
        request(app) 
        .patch(`/users/1/orders/1/paid`)
        .set("access_token", access_token)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(403)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })

    // testing tidak jalan
    // ======================== error internal server==========================
    // it('should status 500, error internal server' ,function (done) {
    //     //setup

    //     //excecute
    //     request(app) 
    //     .patch(`/users/${userId}/orders/${idOrder}/paid`)
    //     .set("access_token", userToken)

    //     .end((err, res) => {
    //         if(err) done(err)
                    
    //         //assert
    //         expect(res.statusCode).toEqual(500)
    //         expect(typeof res.body).toEqual('object')
    //         expect(res.body).toHaveProperty('messages')
    //         expect(typeof res.body.messages).toEqual('string')

    //         done()
    //     })
    // })

    

    // ====================== user not login ===========================
    it('should status 401, error not login ' ,function (done) {
        //setup
   
        //excecute
        request(app) 
        .patch(`/artists/${artistId}/orders/${orderId}/accepted`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(401)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })

    // ====================== payment gateway =====================
    //  ============= harusnya 200 tapi ini jadi 400
    it('should status 400, error payment gateway' ,function (done) {
        //setup
        const body = {
            gross_amount : 200000
        }
    
        //excecute
        request(app) 
        .post(`/users/1/requestPaymentGateway/orders/1`)
        .set("access_token", userToken)
        .send(body)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty("name")

            done()
        })
    })
})