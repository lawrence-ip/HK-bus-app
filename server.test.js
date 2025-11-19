const request = require('supertest');
const app = require('./server');

describe('KMB Route API', () => {
  describe('GET /v1/transport/kmb/route/:route/:direction/:service_type', () => {
    it('should return route information for valid request', async () => {
      const response = await request(app)
        .get('/v1/transport/kmb/route/74B/outbound/1')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('type', 'Route');
      expect(response.body).toHaveProperty('version', '1.0');
      expect(response.body).toHaveProperty('generated_timestamp');
      expect(response.body).toHaveProperty('data');
      
      const data = response.body.data;
      expect(data).toHaveProperty('co', 'KMB');
      expect(data).toHaveProperty('route', '74B');
      expect(data).toHaveProperty('bound', 'O');
      expect(data).toHaveProperty('service_type', '1');
      expect(data).toHaveProperty('orig_en', 'KOWLOON BAY');
      expect(data).toHaveProperty('orig_tc', '九龍灣');
      expect(data).toHaveProperty('orig_sc', '九龙湾');
      expect(data).toHaveProperty('dest_en', 'TAI PO CENTRAL');
      expect(data).toHaveProperty('dest_tc', '大埔中心');
      expect(data).toHaveProperty('dest_sc', '大埔中心');
      expect(data).toHaveProperty('data_timestamp');
    });

    it('should return 422 for invalid direction', async () => {
      const response = await request(app)
        .get('/v1/transport/kmb/route/74B/invalid/1')
        .expect('Content-Type', /json/)
        .expect(422);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Invalid direction');
    });

    it('should return 422 for non-existent route', async () => {
      const response = await request(app)
        .get('/v1/transport/kmb/route/999/outbound/1')
        .expect('Content-Type', /json/)
        .expect(422);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('not found');
    });

    it('should return 422 for non-existent direction for a route', async () => {
      const response = await request(app)
        .get('/v1/transport/kmb/route/74B/inbound/1')
        .expect('Content-Type', /json/)
        .expect(422);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('not available');
    });

    it('should return 422 for non-existent service_type', async () => {
      const response = await request(app)
        .get('/v1/transport/kmb/route/74B/outbound/999')
        .expect('Content-Type', /json/)
        .expect(422);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Service type');
    });

    it('should handle route parameter case sensitivity', async () => {
      // The API is case sensitive, so this should return 422
      const response = await request(app)
        .get('/v1/transport/kmb/route/74b/outbound/1')
        .expect('Content-Type', /json/)
        .expect(422);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('GET /health', () => {
    it('should return health check status', async () => {
      const response = await request(app)
        .get('/health')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
    });
  });
});
