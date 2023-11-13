# Ippo
## Track Your Favorite Anime, One Bookmark At A Time
![logo](https://github.com/Sajid2001/Ippo/assets/60523377/2b261969-f0e2-4cfe-bd95-7e8adf2a1799)


Ippo is an open source anime tracking site that makes keeping up with your favorite anime easier.

## Features

* [Create Bookmarks for your favorite anime TV series or movie](#creating-a-bookmark)
* [Stream Links on every bookmark, which makes continuing where you left off easier](#stream-links)
* [Autocomplete form to filter your bookmarks](#filtering)
* [Grid and Table view](#list-view)

## Stack

* Angular (JavaScript)
* Angular Material
* Spring Boot (Java, Maven)
* Jikan API
* OpenSSL
* MySQL
* Docker

## How To Use

### Creating a Bookmark

https://github.com/Sajid2001/Ippo/assets/60523377/7a9d005e-e4b2-485c-acaf-0f05cd15313a

https://github.com/Sajid2001/Ippo/assets/60523377/46b044f1-2118-4f85-88b6-df087633be5c

### Editing a Bookmark

https://github.com/Sajid2001/Ippo/assets/60523377/8ae2cb10-651a-4712-84aa-65c3a3659448

### Stream Links

https://github.com/Sajid2001/Ippo/assets/60523377/0e1db68b-8327-4777-b337-a021f6862205

### Filtering

https://github.com/Sajid2001/Ippo/assets/60523377/0043c66e-2ed7-41de-9c49-d25ea69e55e5

### List View

https://github.com/Sajid2001/Ippo/assets/60523377/fc865bda-2e14-43e3-bf5d-f470ea6d7b7f

## How To Contribute

### Files Needed
1. In ```./frontend-folder/src/environments``` , create a file named ```environemts.ts``` and a file named ```environment.prod.ts```. Check the ```sample.environment.ts``` file for what variables need to be added.
2. **If you are not using Docker** and would like to run the project on your machine, navigate ```./AniList/src/main/java/resources``` and run the following commands:
   ```
    mkdir certs
    openssl genrsa -out /certs/keypair.pem 2048 && \
    openssl rsa -in /certs/keypair.pem -pubout -out /certs/public.pem && \
    openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in /certs/keypair.pem -out /certs/private.pem
   ```
   Make sure OpenSSL is already installed on your computers

### Instructions (Using Docker)
1. Run the command ```docker-compose up``` in the project directory to run every component of the application (frontend, backend, database), in containers (Make sure you have docker installed on your computer)
2. The backend should run on localhost:8080 and the frontend should run on localhost:4200

### Instructions (Not Using Docker)
1. Open the ```AniList``` folder in Eclipse, mark the ```./Anilist/src/main/java``` folder as the sources root, install the dependencies using the Maven plugin, and run the application.
2. Navigate to ```./frontend-folder``` and run the frontend using the command ```ng serve```
3. The backend should run on localhost:8080 and the frontend should run on localhost:4200

## Find Any Bugs?
If you found an issue or would like to submit an improvement to this project, please submit an issue using the issues tab above. If you would like to submit a Pull Request with a fix, reference the issue that you created.

## Known Issues
Sometimes the bookmark is not added into the application after the form to create one has been filled out and submitted. Simply refresh the page when this happens. 
