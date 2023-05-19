const app = require("../../app")
const request = require('supertest')
// const {newApartment} = require('../../Controller/apartment-Controller')

describe('apartment',() =>{
  it('testNewApartment',async() => {
    const newApartment = {
      apartmentno:'W05',
      floor:10,
      buildingNo:'W',
      type:'Luxury',
      status:'Owned',
      ownersName:'WWWWW',
      email:'WWWWW@gmail.com'
    }

      const res = await request(app).post('/apartment/add').send(newApartment)
      console.log("testing .....")

      expect(res.statusCode).toEqual(200)
  })

  it('testViewApartment',async() => {
    
      const res = await request(app).get('/apartment/view')
      console.log("testing .....")

      expect(res.statusCode).toEqual(200)
  })

  it('testViewApartmentById',async() => {
    
    const _id ='641e20510bdd9a3fff33b503'

    const res = await request(app).get(`/apartment/getById/${_id}`)
    console.log("testing .....")

    expect(res.statusCode).toEqual(200)
})

it('testUpdateApartment',async() => {
  
  const _id ='641e20510bdd9a3fff33b503'
  const data = {
    type :"normal",
     status :"ok" ,
     ownersName:"kaveesha",
      email:"kavee@gmail.com"
  } 
  const res = await request(app).put(`/apartment/update/${_id}`).send(data)
  console.log("testing .....")

  expect(res.statusCode).toEqual(200)
})

it('testDeleteApartment',async() => {

  const _id ='641e20510bdd9a3fff33b503'
    
  const res = await request(app).delete(`/apartment/delete/${_id}`)
  console.log("testing .....")

  expect(res.statusCode).toEqual(200)
})
})

