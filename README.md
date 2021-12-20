# Express-gateway를 활용한 인증 서버

## iOS 레포

https://github.com/bengHak/Authentication-iOS

## 도커 세팅

```
// mysql 데이터베이스
docker run --name pp -e MYSQL_ROOT_PASSWORD=sdc0123! -d -p 3306:3306 mysql:8.0.27

// Redis 설정
docker run --name redis-db -d -p 6379:6379 redis
```


## DB 스키마  
<img src="https://user-images.githubusercontent.com/41236155/146725169-cae62d69-f4b2-4f66-b297-02bfbd8fd19e.png" width="20%"/>

## 아키텍쳐

- Auth Service: 회원가입, 로그인, 이메일 인증
- Mail Service: 인증코드를 이메일로 발송
- User Service: 유저 정보 불러오기, 수정
- Admin Service: 유저 정보 삭제, 수정, 목록, 권한 조정
<img width="1193" alt="스크린샷 2021-12-20 오후 5 36 38" src="https://user-images.githubusercontent.com/41236155/146737287-df3d5012-5c27-4000-9a88-40e427e9c9ca.png">
