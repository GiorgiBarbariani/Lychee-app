1. Run the Backend part:
## cd back
## npm install
## node app.js nodemon

2. Run the Frontend part:
## cd front
## npm install
## npm run start

3. Choose from a closed list (dropdown) the following: Listen on Spotify, Listen on Apple, Listen on Google.
You can also write a text in the input. (If the length of the text is more than 20 characters, you will see an error).

4. Press the button "Save".

5. Go to the back folder. On the "output-outro" folder you will find the 20 sec. mp3 file with the text (which you select or write on the input) layer.

6. After 4 sec. the text will fade out.

## You can also run the app using Docker ##

7. To run the backend part using docker:

## cd back
## docker build -t lychee-back .
## docker run --name lychee-back -p 4000:4000 lychee-back

8. To run the backend part using docker:

## cd front
## docker build -t lychee-front .
## docker run --name lychee-front -p 8080:80 lychee-front
