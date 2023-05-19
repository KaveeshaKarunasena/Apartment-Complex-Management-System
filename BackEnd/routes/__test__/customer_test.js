const app = require("../../app")
const request = require('supertest')

describe('customer',() => {
    it('testNewCustomer',async() => {
        const newCustomer =  {
             name : 'Dinura',
             apartmentNo : 'A60',
             nicNo : '200102544785',
             phoneNo : '0759854145',
             email : 'dinura@gmail.com',
             password : 'dinura123',
        }
        const res = await request(app).post('/customer/add').send(newCustomer)
        expect(res.statusCode).toEqual(200)
    })

    it('testLogin',async() => {
        const login = {
            apartmentNo:'A02',
            password:'123456789',
        }
        const res = await request(app).post('/customer/login').send(login)
        expect(res.statusCode).toEqual(200)
    })

    it('testGetCustomer',async() => {
        const id = '641e200b0bdd9a3fff33b500'
        const res = await request(app).get(`/customer/getCustomer/${id}`)
        expect(res.statusCode).toEqual(200)
    })

    it('testUpdateCustomer',async() => {
        const id = '641e200b0bdd9a3fff33b500'
        const update = {
             name : 'Dinusha',
             apartmentNo : 'A02',
             nicNo : '200102544785',
             phoneNo : '0759854145',
             email : 'dinushaweerasekara312@gmail.com',
             password : 'dinusha1234',
        }
        const res = await request(app).put(`/customer/update/${id}`).send(update)
        expect(res.statusCode).toEqual(200)

    })

    it('testResetPassword',async() => {

        const reset = {
            password: 'dinusha1234',
            email : 'kaveeshalankeshwara2001@gmail.com'
           
        }
        const res = await request(app).put(`/customer/recoverypassword`).send(reset)
        expect(res.statusCode).toEqual(200)
    })

    // it('testDeletePhoto',async() => {
    //     const id = '641e200b0bdd9a3fff33b500'
    //     const deletePhoto = {

    //     }
    //     const res = (await request(app).delete(`/customer/delete/${id}/photo`)).send(deletePhoto)
    //     expect(res.statusCode).toEqual(200)
    // })
})