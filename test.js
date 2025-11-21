const http = require('http');

// Start the server
const app = require('./server.js');
const PORT = 3001; // Use different port for testing
const server = app.listen(PORT);

console.log('Starting tests...\n');

// Helper function to make HTTP requests
function makeRequest(path, callback) {
  const options = {
    hostname: 'localhost',
    port: PORT,
    path: path,
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      callback(null, res.statusCode, data);
    });
  });

  req.on('error', (error) => {
    callback(error);
  });

  req.end();
}

// Test 1: GET /v1/transport/kmb/route/
console.log('Test 1: GET /v1/transport/kmb/route/');
makeRequest('/v1/transport/kmb/route/', (error, statusCode, data) => {
  if (error) {
    console.error('❌ Test 1 Failed:', error.message);
  } else {
    console.log(`Status Code: ${statusCode}`);
    
    if (statusCode === 200) {
      try {
        const response = JSON.parse(data);
        
        // Check response structure
        if (response.type === 'RouteList' &&
            response.version === '1.0' &&
            response.generated_timestamp &&
            Array.isArray(response.data)) {
          console.log('✓ Response has correct structure');
          console.log(`✓ Found ${response.data.length} routes`);
          
          // Validate first route
          if (response.data.length > 0) {
            const firstRoute = response.data[0];
            const requiredFields = ['co', 'route', 'bound', 'service_type', 
                                   'orig_en', 'orig_tc', 'orig_sc',
                                   'dest_en', 'dest_tc', 'dest_sc', 
                                   'data_timestamp'];
            
            const hasAllFields = requiredFields.every(field => field in firstRoute);
            if (hasAllFields) {
              console.log('✓ Route data has all required fields');
              console.log('\nSample route data:');
              console.log(JSON.stringify(firstRoute, null, 2));
            } else {
              console.log('❌ Route data missing required fields');
            }
          }
          
          console.log('\n✅ Test 1 Passed');
        } else {
          console.log('❌ Test 1 Failed: Invalid response structure');
        }
      } catch (parseError) {
        console.log('❌ Test 1 Failed: Invalid JSON response');
      }
    } else {
      console.log(`❌ Test 1 Failed: Expected status 200, got ${statusCode}`);
    }
  }
  
  // Test 2: GET invalid endpoint (should return 404)
  console.log('\n\nTest 2: GET /invalid/endpoint (should return 404)');
  makeRequest('/invalid/endpoint', (error, statusCode, data) => {
    if (error) {
      console.error('❌ Test 2 Failed:', error.message);
    } else {
      console.log(`Status Code: ${statusCode}`);
      
      if (statusCode === 404) {
        console.log('✅ Test 2 Passed - Correctly returns 404 for invalid endpoint');
      } else {
        console.log(`❌ Test 2 Failed: Expected status 404, got ${statusCode}`);
      }
    }
    
    // Close server after tests
    console.log('\nAll tests completed.');
    server.close();
  });
});
