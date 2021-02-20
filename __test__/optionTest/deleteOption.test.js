const request = require('supertest')
const { Artist, Option } = require('../../models')
const { beforeAll } = require("@jest/globals")
const app = require('../../app')  
const { generateToken } = require('../../helpers/jwt')

// ===================================================================================
// ==========================  DELETE /artist/:artistId/options/:optionId
// ==================================================================================

describe('DELETE /artist/:artistId/options/:optionId',function() {
    let artistId
    let optionId
    let access_token

    beforeAll(done => {
        Artist.findOne({where : {email : "user@mail.com"}})
        .then(data => {
            artistId = data.id

            const decoded = {
                id : data.id,
                username : data.username
            }

            access_token = generateToken(decoded)

            return Option.findOne({ where : { title : "deleteOptionTestng"}})
        })
        .then(res => {
            optionId = res.id
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })


    // ======================== error options id not found ==========================
    it('should status 404, error options id not found' ,function (done) {
        //setup
        const id = 9999999

        //excecute
        request(app) 
        .delete(`/artist/${artistId}/options/${id}`)
        .set('access_token', access_token)
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

        //excecute
        request(app) 
        .delete(`/artist/${artistId}/options/${optionId}`)
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

    // ======================== successfull delete options ==========================
    it('should status 200, successfull delete options' ,function (done) {
        //setup

        //excecute
        request(app) 
        .delete(`/artist/${artistId}/options/${optionId}`)
        .set('access_token', access_token)
        .end((err, res) => {
            if(err) done(err)
                    
            //assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toEqual('string')

            done()
        })
    })
})