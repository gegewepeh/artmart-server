// describe GET /artists/:artistId/comments   //comment artisnya
// -- it success

const { User, Comment, Artist } = require('../../models')

const request = require('supertest')

const app = require('../../app')  

// ===================================================================================
// ==========================  GET /users/:userId/comments
// ==================================================================================

describe('GET /users/:userId/comments',function() {
    let artistId = null
    let userId = null

    beforeAll(done => {
        User.create({ 
            username : "userTestAddComment",
            firstName : "artist",
            lastName : "idsearch",
            email : "userTestAddComment@mail.com",
            password : '123456',
            profilePicture : ""
        })
        .then(data => {
            userId = data.id

            return Artist.create({
                username : "artistTestAddComment",
                firstName : "artist",
                lastName : "idsearch",
                email : "artistTestAddComment@mail.com",
                password : '123456',
                profilePicture : "link.google.com",
                completeDuration : 48,
                bankAccount : 230230230,
                defaultPrice : 100000
            })
        })
        .then(datas => {
            artistId = datas.id
            return Comment.create({
                description: "testingGetAllComment",
                UserId: userId,
                ArtistId: artistId
            })
        })
        .then(res => {
            done()
        })
    })


    afterAll(done => {
        Comment.destroy({ where : { description : "testingGetAllComment"}})
        .then(data => {
            done()
        })
    })

    // ======================== successfull get all comments ==========================
    it('should status 200, successfull get all comments' ,function (done) {
        //setup

        //excecute
        request(app) 
        .get(`/artists/${artistId}/comments`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(Array.isArray (res.body)).toEqual(true)
            res.body.forEach(comment => {
                expect (typeof comment).toEqual('object')
                expect (comment).toHaveProperty('description')
                expect (typeof comment.description).toEqual('string')
            })

            done()
        })
    })


    // ======================== error internal server ==========================
    it('should status 500, error internal server' ,function (done) {
        //setup
        const idArtist = "sdad"

        //excecute
        request(app) 
        .get(`/artists/${idArtist}/comments`)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(500)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('messages')
            expect(typeof res.body.messages).toEqual('string')

            done()
        })
    })
})
