import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

function HelmetWrapper({ title, description }) {
    // 사이트 메타 정보 불러오기

    // 기존 쿼리에 siteUrl, image 필드 추가
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            image
            siteUrl
          }
        }
      }
    `,
  );

  const { siteMetadata } = site;
  // 사이트 디스크립션 기본값 지정
  const metaDescription = description || siteMetadata.description;

  return (
    <Helmet
      title={title}
      // 제목 템플릿 설정
      titleTemplate={`%s | ${siteMetadata.title}`}
      // <meta> 태그를 여러개 추가 가능
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        // 오픈 그래프 관련 메타 데이터 추가
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:url',
          content: siteMetadata.siteUrl,
        },
        {
          property: 'og:image',
          content: siteMetadata.image,
        },
        {
          property: 'og:type',
          content: 'website',
        },
      ]}
    >
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1511546096943469"
        crossOrigin="anonymous"
      ></script>
    </Helmet>
  );
}

// 이 컴포넌트에서 사용하는 props에 대한 기본값 지정
HelmetWrapper.defaultProps = {
  description: null,
};

// 이 컴포넌트에서 사용하는 props에 대한 타입 지정
HelmetWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default HelmetWrapper;