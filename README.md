You need to create the `.env` file. You will find every property in `sample.env`. 

## HOW YO GENERATE CERTIFICATES:

On your Ubuntu globally:
```
sudo apt update
sudo apt install -y mkcert libnss3-tools || true
mkcert -install
```
Open the project directory in Ubuntu:
```
mkcert -key-file ./certs/localhost-key.pem -cert-file ./certs/localhost-cert.pem localhost 127.0.0.1 ::1
```
**IMPORTANT!!!** Certs **must** have names:
```
localhost-cert.pem
localhost-key.pem
```
