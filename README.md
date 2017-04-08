# Tarchivebot
A Telegram bot that logs your chat and provides you with a key to look up various statistics.

## Setup
1. `cp config/auth.json.example config/auth.json`
2. `cp db/tarchive.db.example db/tarchive.db`
3. Edit the `auth.json` file.
4. `npm install`
5. Install `SQLite3` on your server using your favorite package manager.

## Running

`npm start`

### Webserver only
`npm run webserver`

### Telegram Bot only
`npm run bot`
