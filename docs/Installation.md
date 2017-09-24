# Selfhosting
Definitely selfhost this bot if you've got the resources! We've made the setup as painless as possible using Docker.

## First steps

Clone the repository: `git clone https://github.com/PROGRADE-Tech/Tarchivebot.git`

Once that's done you should deploy the database and edit the config file:

1. `cp config/config.json.example config/config.json`
2. `cp db/tarchive.db.example db/tarchive.db`
3. Edit the `config/config.json` file.

Alternatively you can use the `setup.sh` script which executes the above steps for you:

1. `./setup.sh`

Now you're ready for the installation.

## Installation using Docker
### docker-compose
Provided that you are in the cloned repo with the `docker-compose.yml` file and have done the above mentioned steps:
```
docker-compose up -d
```
This process will take a while. After it's done, the application should be running on `localhost:3000`. Ofcourse the port can be adjusted in the `docker-compose.yml` file.


### docker run

Then build the Docker image:

```
docker build -t prograde-tech/tarchive .
```

Now your image is ready to be run:

```
docker run -d \
	--name tarchive \
	-p 3000:3000 \
	-v $PWD/config/config.json:/usr/src/app/config/config.json \
	-v $PWD/db/tarchive.db:/usr/src/app/db/tarchive.db \
	prograde-tech/tarchive
```
One-liner version: `docker run -d --name tarchive -p 3000:3000 -v $PWD/config/config.json:/usr/src/app/config/config.json -v $PWD/db/tarchive.db:/usr/src/app/db/tarchive.db prograde-tech/tarchive`

Make sure the bot is running using `docker ps -a` and `docker logs tarchive`.

## Manual installation
Alternatively you can install the software manually:

1. `npm install`
2. Install `SQLite3` on your server using your favorite package manager (optional).
3. `npm start`

You could also only run the web front end: `npm run webserver`.

Or maybe you just want to run the Telegram bot itself: `npm run bot`
