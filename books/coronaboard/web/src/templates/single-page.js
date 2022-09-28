import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { css } from '@emotion/react';
import { Dashboard } from '../components/dashboard';

export default function SinglePage({ pageContext }) {
    // pageContext를 통해 전달된 데이털르 추출해서 사용
    const { dataSource } = pageContext;
    const { lastUpdated, globalStats } = dataSource;
    // 사용자의 언어/지역 설정에 맞는 날짜 형태로 표시
    const lastUpdatedFormatted = new Date(lastUpdated).toLocaleString();

    return (
        <div id='top'>
            {/* 상단 검은색 배경 만들기 */}
            <div
              css={css`
                position: absolute;
                background-color: black;
                width: 100%;
                height: 300px;
                z-index: -99;
              `}
            />
            {/* 제목 표시 */}
            <h1
              css={css`
                padding-top: 48px;
                padding-bottom: 24px;
                color: white;
                text-align: center;
                font-size: 28px;
              `}
            >
              코로나19(COVID-19)
              <br />
              실시간 상황판
            </h1>
            {/* 마지막 업데이트 정보 표시 */}
            <p className="text-center text-white">
                마지막 업데이트: {lastUpdatedFormatted}
            </p>

            <Dashboard globalStats={globalStats} />
        </div>
    );
}