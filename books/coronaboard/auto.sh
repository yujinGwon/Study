#!/bin/bash

# 저장소에서 최신 코드 불러오기
git pull

# 의존성 설치
# npm install

# 구글 시트에서 치신 데이터 타운로드
# (cd ../tools && node main.js)

# MySql Start
#mysql.server start

# API 실행
(cd api && pm2 start index.js)

sleep 2

# cralwer 실행
(cd crawler && node index.js)


# 개츠비 배포용 빌드 수행
cd web && gatsby develop --host=192.168.0.9
