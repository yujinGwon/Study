

const SheetApiClientFactory = require('./sheet_api_client_factory');
const SheetDownloader = require('./sheet_downloader');

async function main() {
  try {
    const sheetApiClient = await SheetApiClientFactory.create();
    const downloader = new SheetDownloader(sheetApiClient);

    // 아래와 같은 구글 스프레드시트 주소 중 d와 edit 사이에 들어있는 부분이 스프레드시트의 ID 값 입니다.
    // https://docs.google.com/document/d/1bZbLi45kqRyE1fSBphWzFFKaJobcaMplBzr82rRXjPM/edit#
    const spreadsheetId = '1z2d4gBO8JSI8SEotnHDKdcq8EQ9X4O5fWPxeUCAqW1c';

    // 공지 내려받기
    const notice = await downloader.downloadToJson(
      spreadsheetId,
      'notice',
      'downloaded/notice.json',
    );

    console.log(notice);

    // 국가 정보 내려받기
    const countryInfo = await downloader.downloadToJson(
      spreadsheetId,
      'countryInfo',
      'downloaded/countryInfo.json',
    );

    console.log(countryInfo);
  } catch (e) {
    console.error(e);
  }
}

main();

// invalid_grant 인증 오류 발생시
// 액세스 토큰 사용 기간이 만료된 것으로
// accessToken.json 파일 삭제 후 node main.js 다시 실행할 것.