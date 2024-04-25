const request = require('supertest');
const express = require('express');
const fs = require('fs');
const app = express();

app.get('/comments', (req, res) => {
    fs.readFile('data/comments.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments file.');
            return;
        }
        res.json(JSON.parse(data || '[]'));
    });
});


describe('GET /comments', () => {
    it('should return comments list when file read is successful', async () => {
        jest.spyOn(fs, 'readFile').mockImplementation((path, cb) => {
            cb(null, JSON.stringify([{ id: 1, comment: "Nice successfully test!" }]));
        });

        const response = await request(app).get('/comments');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([{ id: 1, comment: "Nice successfully test!" }]);
        expect(response.body.length).toBeGreaterThan(0);
    });

   
    it('should handle error when file read fails', async () => {
        jest.spyOn(fs, 'readFile').mockImplementation((path, cb) => {
            cb(new Error('Failed to read file'), null);
        });

        const response = await request(app).get('/comments');
        expect(response.statusCode).toBe(500);
        expect(response.text).toEqual('Error reading comments file.');
    });
});
 

