const request = require('supertest');
const app = require('./server');

describe('KMB Stop List API', () => {
  describe('GET /v1/transport/kmb/stop', () => {
    it('should return 200 status code', async () => {
      const response = await request(app).get('/v1/transport/kmb/stop');
      expect(response.statusCode).toBe(200);
    });

    it('should return JSON content type', async () => {
      const response = await request(app).get('/v1/transport/kmb/stop');
      expect(response.headers['content-type']).toMatch(/json/);
    });

    it('should return StopList response structure', async () => {
      const response = await request(app).get('/v1/transport/kmb/stop');
      
      expect(response.body).toHaveProperty('type', 'StopList');
      expect(response.body).toHaveProperty('version', '1.0');
      expect(response.body).toHaveProperty('generated_timestamp');
      expect(response.body).toHaveProperty('data');
    });

    it('should return data as an array', async () => {
      const response = await request(app).get('/v1/transport/kmb/stop');
      
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should return stop objects with required fields', async () => {
      const response = await request(app).get('/v1/transport/kmb/stop');
      
      const stops = response.body.data;
      expect(stops.length).toBeGreaterThan(0);
      
      stops.forEach(stop => {
        expect(stop).toHaveProperty('stop');
        expect(stop).toHaveProperty('name_tc');
        expect(stop).toHaveProperty('name_en');
        expect(stop).toHaveProperty('name_sc');
        expect(stop).toHaveProperty('lat');
        expect(stop).toHaveProperty('long');
        expect(stop).toHaveProperty('data_timestamp');
      });
    });

    it('should have valid generated_timestamp in ISO format', async () => {
      const response = await request(app).get('/v1/transport/kmb/stop');
      
      const timestamp = response.body.generated_timestamp;
      expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });
  });

  describe('GET /invalid/path', () => {
    it('should return 404 for invalid paths', async () => {
      const response = await request(app).get('/invalid/path');
      expect(response.statusCode).toBe(404);
    });
  });
});
