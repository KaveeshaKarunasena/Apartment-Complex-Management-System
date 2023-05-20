const app = require("../../app")
const request = require('supertest')

describe('employertest',() => {

    it('testNewEmployee',async() => {
        const newEmployee ={
            name: '',
            nic: '',
            dob: '2001-04-17',
            address: 'kandy',
            jobTitle: 'manager',
            department: 'management',
            contactNumber: '785462434',
            basicSalary: '',
            allowance: '0',
            overtime: '0',
          };
        const res = await request(app).post('/employee/add').send(newEmployee)
        expect(res.statusCode).toEqual(200)
    })

    it('testViewEmployee',async() => {
        const res = await request(app).post('/employee/view')
        expect(res.statusCode).toEqual(200)
    })

    it('testViewEmployee',async() => {
        const name = 'Heshanth'

        const res = await request(app).get(`/employee/getById/${name}`)
        expect(res.statusCode).toEqual(200)
    })

    it('testUpdateEmployee',async() => {
        const id = ''
        const updatedEmployee = {
            name: 'zimmendra',
            nic: '200103678465',
            dob: '2001-04-17',
            address: 'kandy',
            jobTitle: 'manager',
            department: 'management',
            contactNumber: '0812235679',
            basicSalary: '24000',
            allowance: '1',
            overtime: '1',
          }

        const res = await request(app).post(`/update/${id}`).send()
        expect(res.statusCode).toEqual(200)
    })

    it('testDeleteEmployee',async() => {
        const id = '6467a1b1887b5bfb'

        const res = await request(app).delete(`/employee/delete/${id}`)
        expect(res.statusCode).toEqual(200)
    })


    
})