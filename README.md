# HK-bus-app
App to check bus minibus times

## KMB Route API

This application provides an API endpoint for retrieving KMB (Kowloon Motor Bus) route information.

### API Endpoint

**GET** `/v1/transport/kmb/route/{route}/{direction}/{service_type}`

Returns route information for a specified KMB bus route.

#### Parameters

- `route` (required): The route number of the bus (e.g., "74B"). Case sensitive.
- `direction` (required): The direction of the route. Valid values are:
  - `outbound`
  - `inbound`
- `service_type` (required): The service type of the bus route (e.g., "1")

#### Response Codes

- `200`: Success
- `422`: Invalid parameters (see message in response body)
- `500`: Internal Server Error

#### Example Request

```bash
curl http://localhost:3000/v1/transport/kmb/route/74B/outbound/1
```

#### Example Response

```json
{
  "type": "Route",
  "version": "1.0",
  "generated_timestamp": "2025-11-19T18:06:45+08:00",
  "data": {
    "co": "KMB",
    "route": "74B",
    "bound": "O",
    "service_type": "1",
    "orig_en": "KOWLOON BAY",
    "orig_tc": "九龍灣",
    "orig_sc": "九龙湾",
    "dest_en": "TAI PO CENTRAL",
    "dest_tc": "大埔中心",
    "dest_sc": "大埔中心",
    "data_timestamp": "2025-11-19T18:06:45+08:00"
  }
}
```

## Installation

```bash
npm install
```

## Running the Server

```bash
npm start
```

The server will start on port 3000 by default. You can change this by setting the `PORT` environment variable:

```bash
PORT=8080 npm start
```

## Running Tests

```bash
npm test
```

## Project Structure

- `server.js` - Main Express server with API endpoint implementation
- `server.test.js` - Test suite for the API endpoints
- `package.json` - Node.js project configuration
