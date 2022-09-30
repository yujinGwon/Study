#!/bin/bash

# 저장소에서 최신 코드 불러오기
git pull

# 의존성 설치
npm install

# 구글 시트에서 치신 데이터 타운로드
(cd ../tools && node main.js)

# 개츠비 배포용 빌드 수행
NODE_OPTION='--max-old-space-size=1536' node run build

# *.html, *.json 파일은 웹 브라우저에서 캐시하되
# 매번 서버에서 파일 내용이 변경된 것이 있는지 확인 요청을 하도록 설정
# cache-control: public, max-age=0, must-revalidate
aws s3 sync \
--acl public-read \
--cache-control public,max-age=0,must-revalidate \
--exclude "*" \
--include "*.html" --include "*.json" \
--delete \
./public s3://coronaboard.kr # s3://버킷이름

# HTML, JSON을 제외한 모든 파일은 웹브라우저에서 1년간 캐시하도록 설정
# cache-control: public, max-age=31536000
aws s3 sync \
--acl public-read \
--cache-control public,max-age=31536000 \
--exclude "*.html" --exclude "*.json" \
--delete \
./public