// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");


describe('./musicians endpoint', () => {
    // Write your tests here
    
    test('should return list of all musicians', async() => {
        const response = await request(app).get("/musicians")
        const data = JSON.parse(response.text)
        expect(response.statusCode).toBe(200)
        expect(data.length).toBe(3)
    });




    
})