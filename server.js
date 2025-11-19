const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Sample stop data
const stopData = [
  {
    "stop": "A3ADFCDF8487ADB9",
    "name_tc": "中秀茂坪",
    "name_en": "SAU MAU PING (CENTRAL)",
    "name_sc": "中秀茂坪",
    "lat": 22.318856,
    "long": 114.231353,
    "data_timestamp": "2020-11-29T11:40:00+08:00"
  },
  {
    "stop": "6F106FD26B684372",
    "name_en": "SAU ON HOUSE",
    "name_tc": "秀安樓",
    "name_sc": "秀安楼",
    "lat": "22.316738",
    "long": "114.233354",
    "data_timestamp": "2020-11-29T11:40:00+08:00"
  }
];

// GET /v1/transport/kmb/stop - Stop List API
app.get('/v1/transport/kmb/stop', (req, res) => {
  try {
    const response = {
      "type": "StopList",
      "version": "1.0",
      "generated_timestamp": new Date().toISOString(),
      "data": stopData
    };
    
    res.status(200).json(response);
  } catch (error) {
    console.error('Error generating stop list:', error);
    res.status(500).json({
      "error": "Internal Server Error",
      "message": "An error occurred while processing your request"
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    "error": "Internal Server Error",
    "message": "An unexpected error occurred"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    "error": "Not Found",
    "message": "The requested resource was not found"
  });
});

// Start server only if not imported as a module
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Stop List API available at: http://localhost:${PORT}/v1/transport/kmb/stop`);
  });
}

module.exports = app;
