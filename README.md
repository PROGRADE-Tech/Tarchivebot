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

## License
Tarchivebot

Copyright (C) 2017 Severin Fürbringer and [contributors](https://github.com/PROGRADE-Tech/Tarchivebot/blob/master/CONTRIBUTORS.md)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
