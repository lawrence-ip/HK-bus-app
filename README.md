# HK-bus-app
App to check bus minibus times

## KMB Routes API

This application provides a REST API for accessing KMB (Kowloon Motor Bus) route information.

### Installation

```bash
npm install
```

### Running the Server

```bash
npm start
```

The server will start on port 3000 by default. You can set a custom port using the `PORT` environment variable:

```bash
PORT=8080 npm start
```

### API Endpoints

#### GET /v1/transport/kmb/route/

Returns a list of all KMB bus routes.

**Response Format:** JSON

**Response Codes:**
- `200` - Success
- `422` - Validation Error
- `500` - Internal Server Error

**Sample Response:**
```json
{
  "type": "RouteList",
  "version": "1.0",
  "generated_timestamp": "2020-11-29T11:40:48+08:00",
  "data": [
    {
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
      "data_timestamp": "2020-11-29T11:40:00+08:00"
    },
    {
      "co": "KMB",
      "route": "74B",
      "bound": "I",
      "service_type": "1",
      "orig_en": "TAI PO CENTRAL",
      "orig_tc": "大埔中心",
      "orig_sc": "大埔中心",
      "dest_en": "KWUN TONG FERRY",
      "dest_tc": "觀塘碼頭",
      "dest_sc": "观塘码头",
      "data_timestamp": "2020-11-29T11:40:00+08:00"
    }
  ]
}
```

**Field Descriptions:**
- `co` - Company code (e.g., "KMB")
- `route` - Route number
- `bound` - Direction: "O" (Outbound) or "I" (Inbound)
- `service_type` - Service type identifier
- `orig_en` - Origin name in English
- `orig_tc` - Origin name in Traditional Chinese
- `orig_sc` - Origin name in Simplified Chinese
- `dest_en` - Destination name in English
- `dest_tc` - Destination name in Traditional Chinese
- `dest_sc` - Destination name in Simplified Chinese
- `data_timestamp` - Timestamp when the route data was last updated

### Testing

Run the test suite:

```bash
npm test
```

### Example Usage

```bash
# Get all routes
curl http://localhost:3000/v1/transport/kmb/route/
```
