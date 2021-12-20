# Express-gateway를 활용한 인증 서버

## 도커 세팅

```
// mysql 데이터베이스
docker run --name pp -e MYSQL_ROOT_PASSWORD=sdc0123! -d -p 3306:3306 mysql:8.0.27

// Redis 설정
docker run --name redis-db -d -p 6379:6379 redis
```


## DB 스키마  
<img src="https://user-images.githubusercontent.com/41236155/146725169-cae62d69-f4b2-4f66-b297-02bfbd8fd19e.png" width="20%"/>
