# CloudShare

#Security used clerk with jwt

#Used ngrok for web hooks for create user delete user and update user

brew install ngrok
dopo comando for autotoken
ngrok http http://localhost:8080

dopo copia il link che ci sta e su clerk configurer webhook
add end point e mettiamo il link nel url
/api/webhook/clerk   che penso che questo mapping lo aggiungiamo in un 
rest controller su spring boot

dopo su subscribe event cerchiamo user 

create 

dopo copiamo la secret key e togliamo la fase iniziale fino al_