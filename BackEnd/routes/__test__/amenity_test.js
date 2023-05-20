const app = require("../../app")

const request = require('supertest')

describe('register',() => {
    it('testAddAmenity',async() => {
        const newAmenity =  {
            
            product_id: "YG009",
            title: "Yoga Deck",
            fee: 2500,
            description: "a wide array of the most traditional and the most beneficial physical…",
            content: "Breathing exercises and meditations.",
            images:  "Yoga Deck.jpg",
            category: "Yoga",
            checked: false,
            sold: 0
        }
        const res = await request(app).post('/product/products').send(newAmenity)
        expect(res.statusCode).toEqual(200)
    })


    it('testGetProduct',async() => {
        const res = await request(app).post('/product/products')
        expect(res.statusCode).toEqual(200)
    })

    it('testUpdate',async() => {
        const id = 'YG001'
        const update = {
            product_id: "YG001",
            title: "Yoga Deck",
            fee: 2500,
            description: "a wide array of the most traditional and the most beneficial physical…",
            content: "Breathing exercises and meditations.",
            images:  "Yoga Deck.jpg",
            category: "Yoga",
            checked: false,
            sold: 0
        }
        const res = (await request(app).put(`/product/products/${id}`)).send(update)
        expect(res.statusCode).toEqual(200)

    })

    it('testDelete',async() => {
        const deteleProduct={}
        const id = 'I001'
        const res = await request(app).delete(`/product/products/${id}`).send(deteleProduct)
        expect(res.statusCode).toEqual(200)
    })

    
})