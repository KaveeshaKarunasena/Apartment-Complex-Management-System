const app = require("../../app")
const request = require('supertest')
// const {newApartment} = require('../../Controller/apartment-Controller')

describe('service-Provider',() =>{
  it('testNewServiceProvider',async() => {
    const serviceProvider = {
        companyName: 'Central srvice',
        serviceType:'',
        location:'Kandy',
        contactNumber:'0766974709',
    }

      const res = await request(app).post('/service-provider/add').send(serviceProvider)
      expect(res.statusCode).toEqual(200)
  })

  it('testViewServiceProvider',async() => {
    
      const res = await request(app).post('/service-provider')
      expect(res.statusCode).toEqual(200)
  })

  it('testUpdateServiceProvider',async() => {
    
    const id = ""
    const data ={
        companyName: 'APIT',
        serviceType:'Clerk',
        location:'Kurunagala',
        contactNumber:'0766974709',
    }
    const res = await request(app).put(`/service-provider/update/${id}`).send(data)
    expect(res.statusCode).toEqual(200)
})


it('testDeleteServiceProvider',async() => {
    
    const id = ""
    const res = await request(app).delete(`/service-provider/delete/${id}`)
    expect(res.statusCode).toEqual(200)
})

it('testGetServiceProviderById',async() => {
    
    const id = ""
    const res = await request(app).get(`/service-provider/ge/${id}`)
    expect(res.statusCode).toEqual(200)
})

})