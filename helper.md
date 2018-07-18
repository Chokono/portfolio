openssl req \
       -newkey rsa:2048 -nodes -keyout domain.key \
       -x509 -days 365 -out domain.crt

mongod --dbpath /data/<path> --port <port no> 
