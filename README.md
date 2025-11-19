# HK-bus-app
App to check bus minibus times

## KMB Stop List API

This application provides a REST API for retrieving bus stop information for the Kowloon Motor Bus (KMB) service.

### Installation

```bash
npm install
```

### Running the Server

```bash
npm start
```

The server will start on port 3000 by default (or the port specified in the `PORT` environment variable).

### API Endpoints

#### Stop List API
Returns all bus stop information.

**Endpoint:** `/v1/transport/kmb/stop`  
**HTTP Method:** `GET`  
**Update Frequency:** Daily at 05:00

**Sample Request:**
```bash
curl http://localhost:3000/v1/transport/kmb/stop
```

**Response Format:** JSON

**HTTP Status Codes:**
- `200` - Success
- `422` - Validation error (see message in response body)
- `500` - Internal Server Error

**Sample Response:**
```json
{
  "type": "StopList",
  "version": "1.0",
  "generated_timestamp": "2025-11-19T18:06:38.837Z",
  "data": [
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
  ]
}
```

**Response Fields:**
- `type`: Response type identifier (always "StopList")
- `version`: API version
- `generated_timestamp`: Timestamp when the response was generated (ISO 8601 format)
- `data`: Array of stop objects containing:
  - `stop`: Unique stop identifier
  - `name_tc`: Stop name in Traditional Chinese
  - `name_en`: Stop name in English
  - `name_sc`: Stop name in Simplified Chinese
  - `lat`: Latitude coordinate (number or string)
  - `long`: Longitude coordinate (number or string)
  - `data_timestamp`: Timestamp of stop data (ISO 8601 format)
