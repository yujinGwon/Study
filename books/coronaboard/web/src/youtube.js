const axios = require('axios');
// 로케일 설정에 따라 n분 전, n시간 전 등의 형태로 시간을 표시해주는 라이브러리 사용
const TimeAgo = require('javascript-time-ago');
const ko = require('javascript-time-ago/locale/ko');
TimeAgo.addLocale(ko);
const timeAgoKorean = new TimeAgo('ko-KR');

require('dotenv').config();

// 구글 클라우드 콘솔을 통해 발급받은 API 키
const apiKey = process.env.YOUTUBE_SEARCH_API_KEY;

function truncateText(text, maxLength) {
  if (!text) {
    return '';
  }

  if (text.length > maxLength) {
    return text.substr(0, maxLength) + '...';
  } else {
    return ds;
  }
}

// 유튜브 API에서 전달된 item을 코로나보드에서 사용하기 좋은 형태로 변환
function convertModel(item) {
  const { id, snippet, statistics } = item;

  return {
    videoUrl: 'https://www.youtube.com/watch?v=' + id,

    // 타임스탬프 형태로 주어지는 publishedAt을 Date 객체로 변경한 후 포매팅
    publishedAt: timeAgoKorean.format(Date.parse(snippet.publishedAt)),
    title: snippet.title,
    channelTitle: snippet.channelTitle,
    thumbnail: snippet.thumbnails ? snippet.thumbnails.medium.url : '',
    description: truncateText(snippet.description, 80),

    viewCount: parseInt(statistics.viewCount),
  };
}

// API Docs
// 1. search ID: https://developers.google.com/youtube/v3/docs/search/list?apix_params=%7B%22part%22%3A%22id%22%2C%22q%22%3A%22%EC%9A%B0%ED%95%9C%20%ED%8F%90%EB%A0%B4%22%7D
// 2. get details: /youtube/v3/videos?id=RrcdUtFz1T0,RJDroTVhP3c,wRP8_RWGZfI,efkVSgZCzO4,29Er1UVxcxw&order=relevance&part=snippet,statistics&maxResults=5&key=AIzaSyCi8Hc_il_iQmejzzro4wDAneN4KWXQ7rM&prettyPrint=true
async function getYouTubeVideosByKeyword(keyword) {
  // 검색 API를 사용해 원하는 영상 검색
  const searchResponse = await axios.get(
    'https://content.googleapis.com/youtube/v3/search',
    {
      params: {
        key: apiKey,
        q: keyword,
        type: 'video', // video, channel, playlist 중 하나
        part: 'id', // 검색 조건을 만족하는 비디오의 id값 만 조회
        maxResults: 3,
      },
    },
  );

  const ids = searchResponse.data.items.map((x) => x.id.videoId);
  // 검색해 획득한 id 값들을 이용하여 비디오 정보, 통계 데이터 조회
  const detailResponse = await axios.get(
    'https://content.googleapis.com/youtube/v3/videos',
    {
      params: {
        key: apiKey,
        id: ids.join(','),
        order: 'relevance',
        // snippet: 제목, 설명, 업로드 날짜 등의 비디오 정보 조회
        // statistics에는 조회수 등의 통계 정보 조회
        part: 'snippet,statistics',
      },
    },
  );

  return detailResponse.data.items.map(convertModel);
}

module.exports = {
  getYouTubeVideosByKeyword,
};