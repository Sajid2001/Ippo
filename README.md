# Ippo
## Track Your Favorite Anime, One Bookmark At A Time

Ippo is an open-source service that makes tracking your favorite anime and reduces the friction for you.

## Technolgies Used

* Angular (JavaScript)
* Angular Material
* Spring Boot(Java, Maven)
* OpenSSL
* MySQL
* Docker

## How To Use



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
