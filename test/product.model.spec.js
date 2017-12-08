import 'babel-polyfill'

const chai = require('chai');
const expect = require('chai').expect;
const should = chai.should();
const server = require('../server.js'); // Our app

chai.use(require('chai-http'));

describe('Products endpoint', function() {
    it('should return all products', function() {
        return chai.request(server)
            .get('/products')
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
                res.body.length.should.be.eql(81);
            });
    });
    it('should return all products with limit=2', function() {
        return chai.request(server)
            .get('/products?limit=2')
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
                res.body.length.should.be.eql(2);
            });
    });
    it('should return all products sorted asc', function() {
        return chai.request(server)
            .get('/products?sort=asc')
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
                res.body.length.should.be.eql(81);
                let asc = true;
                for (let i = 0; i < res.length - 1; i++) {
                    if (res[i].price > res[i+1].price) {
                        asc = false;
                        break;
                    }
                }
                asc.should.be.eql(true);
            });
    });
    it('should return all products sorted desc', function() {
        return chai.request(server)
            .get('/products?sort=desc')
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
                res.body.length.should.be.eql(81);
                let asc = true;
                for (let i = 0; i < res.length - 1; i++) {
                    if (res[i].price < res[i+1].price) {
                        asc = false;
                        break;
                    }
                }
                asc.should.be.eql(true);
            });
    });
    it('should return all products sorted desc with limit=2', function() {
        return chai.request(server)
            .get('/products?limit=2&sort=desc')
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
                res.body.length.should.be.eql(2);
                let asc = true;
                for (let i = 0; i < res.length - 1; i++) {
                    if (res[i].price < res[i+1].price) {
                        asc = false;
                        break;
                    }
                }
                asc.should.be.eql(true);
            });
    });
    it('should return all products sorted asc with limit=2', function() {
        return chai.request(server)
            .get('/products?limit=2&sort=asc')
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
                res.body.length.should.be.eql(2);
                let asc = true;
                for (let i = 0; i < res.length - 1; i++) {
                    if (res[i].price > res[i+1].price) {
                        asc = false;
                        break;
                    }
                }
                asc.should.be.eql(true);
            });
    });
    it('should return all Store products', function() {
        return chai.request(server)
            .get('/store/5a26396b99173b18b360bf23/products')
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
                for (let i = 0; i < res.length - 1; i++) {
                    res[i].body.should.have.property('store_id').eql('5a26396b99173b18b360bf23');
                }
            });
    });
    it('should return all Store products with limit=2', function() {
        return chai.request(server)
            .get('/store/5a26396b99173b18b360bf23/products?limit=2')
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
                res.body.length.should.be.eql(2);
                for (let i = 0; i < res.length - 1; i++) {
                    res[i].body.should.have.property('store_id').eql('5a26396b99173b18b360bf23');
                }
            });
    });
    it('should return all Store products asc', function() {
        return chai.request(server)
            .get('/store/5a26396b99173b18b360bf23/products?sort=asc')
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
                let asc = true;
                for (let i = 0; i < res.length - 1; i++) {
                    console.log(res[i].price, res[i+1].price);
                    if (res[i].price > res[i+1].price) {
                        asc = false;
                        break;
                    }
                    res[i].body.should.have.property('store_id').eql('5a26396b99173b18b360bf23');
                }
                asc.should.be.eql(true);
            });
    });
    it('should return all Store products asc with limit=2', function() {
        return chai.request(server)
            .get('/store/5a26396b99173b18b360bf23/products?sort=asc&limit=2')
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
                res.body.length.should.be.eql(2);
                let asc = true;
                for (let i = 0; i < res.length - 1; i++) {
                    console.log(res[i].price, res[i+1].price);
                    if (res[i].price > res[i+1].price) {
                        asc = false;
                        break;
                    }
                    res[i].body.should.have.property('store_id').eql('5a26396b99173b18b360bf23');
                }
                asc.should.be.eql(true);
            });
    });
});
