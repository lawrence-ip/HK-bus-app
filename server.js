const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON
app.use(express.json());

// Load route data
let routesData = [];
try {
  const routesFilePath = path.join(__dirname, 'data', 'routes.json');
  const routesFileContent = fs.readFileSync(routesFilePath, 'utf8');
  routesData = JSON.parse(routesFileContent);
} catch (error) {
  console.error('Error loading routes data:', error);
}

// GET /v1/transport/kmb/route/ - Get all KMB routes
app.get('/v1/transport/kmb/route/', (req, res) => {
  try {
    const response = {
      type: 'RouteList',
      version: '1.0',
      generated_timestamp: new Date().toISOString().replace('Z', '+08:00'),
      data: routesData
    };
    
    res.status(200).json(response);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while processing your request'
    });
  }
});

// Error handling for invalid routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred'
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`KMB Routes API server is running on port ${PORT}`);
    console.log(`API endpoint: http://localhost:${PORT}/v1/transport/kmb/route/`);
  });
}

module.exports = app;
