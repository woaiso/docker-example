server {
	listen 80;
	server_name node.woaiso.com;
	rewrite ^(.*)$ https://$host$1 permanent;	
}
server {
    listen 443 ssl http2;
    ssl_certificate /data/ssl/woaiso.crt;
    ssl_certificate_key /data/ssl/woaiso.key;
    server_name node.woaiso.com;
    location / {
        proxy_pass http://app:3000;
    }
}
