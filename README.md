# API integration Pipedrive and Blig

Cron runs every minute, for alter verify file PipedriveJob.js

```
*/1 * * * *
```

## Installation

```
yarn
```

```
yarn dev
```

### Variables (.env)

All variables are in the .env.example

```
HOST=localhost
PORT=8091

# PIPEDRIVE
PIPEDRIVE_URL=https://api.pipedrive.com/v1
PIPEDRIVE_KEY=

# BLING
BLING_URL=https://bling.com.br/Api/v2
BLING_KEY=
```

### Author: [Samuel Rocha]
