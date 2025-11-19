const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Mock data for demonstration - in a real application, this would connect to a database
const routeData = {
  '74B': {
    outbound: {
      '1': {
        co: 'KMB',
        route: '74B',
        bound: 'O',
        service_type: '1',
        orig_en: 'KOWLOON BAY',
        orig_tc: '九龍灣',
        orig_sc: '九龙湾',
        dest_en: 'TAI PO CENTRAL',
        dest_tc: '大埔中心',
        dest_sc: '大埔中心'
      }
    }
  }
};

// Helper function to generate timestamp
function getTimestamp() {
  return new Date().toISOString().replace(/\.\d{3}Z$/, '+08:00');
}

// Helper function to map direction to bound
function mapDirectionToBound(direction) {
  const directionMap = {
    'outbound': 'O',
    'inbound': 'I'
  };
  return directionMap[direction] || null;
}

// Route API endpoint
app.get('/v1/transport/kmb/route/:route/:direction/:service_type', (req, res) => {
  try {
    const { route, direction, service_type } = req.params;
    
    // Validate direction parameter
    if (direction !== 'outbound' && direction !== 'inbound') {
      return res.status(422).json({
        message: 'Invalid direction. Valid directions are: outbound, inbound'
      });
    }
    
    // Check if route exists
    if (!routeData[route]) {
      return res.status(422).json({
        message: `Route ${route} not found`
      });
    }
    
    // Check if direction exists for the route
    if (!routeData[route][direction]) {
      return res.status(422).json({
        message: `Direction ${direction} not available for route ${route}`
      });
    }
    
    // Check if service_type exists for the route and direction
    if (!routeData[route][direction][service_type]) {
      return res.status(422).json({
        message: `Service type ${service_type} not available for route ${route} ${direction}`
      });
    }
    
    // Get the route data
    const data = routeData[route][direction][service_type];
    
    // Construct response
    const response = {
      type: 'Route',
      version: '1.0',
      generated_timestamp: getTimestamp(),
      data: {
        ...data,
        data_timestamp: getTimestamp()
      }
    };
    
    res.status(200).json(response);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server only if not in test mode
if (require.main === module) {
  app.listen(port, () => {
    console.log(`KMB Route API server listening on port ${port}`);
    console.log(`Example: http://localhost:${port}/v1/transport/kmb/route/74B/outbound/1`);
  });
}

module.exports = app;
