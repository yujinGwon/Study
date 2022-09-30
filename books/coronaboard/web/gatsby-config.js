/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
  ],
  siteMetadata: {
    siteUrl: 'https://coronaboard.kr',
    title: '코로나19(COVID-19) 실시간 상황판',
    description: '코로나19에 관한 세계 각 국가들의 통계 및 뉴스 등을 취합해 실시간 정보와 다양한 차트를 제공합니다', 
    // 오픈 그래프용 이미지 추가
    image: 'https://coronaboard.kr/ogimage.png',
  },
};