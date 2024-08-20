# 서울특별시 교육 공공서비스 예약

서울 교육 공공서비스 예약 웹사이트는 서울시의 교육 관련 공공 서비스를 온라인으로 예약할 수 있는 웹 애플리케이션입니다. 이 웹사이트는 서울 열린데이터 광장 홈페이지의 서울시 교육 공공서비스예약 정보 api및 kakaoMap api를 활용하고 있습니다.

[서울 열린데이터 광장 - 교육 공공서비스예약 정보](https://data.seoul.go.kr/dataList/OA-2268/S/1/datasetView.do)

[kakaomap](https://apis.map.kakao.com/)

## 기능

-   서비스 검색 : 원하는 서비스를 검색할 수 있습니다.
    -   검색은 소분류, 지역, 제목으로 검색 기능을 제공합니다.
-   서비스 예약 : 예약 링크를 통해 원하는 교육 서비스를 예약할 수 있습니다.
-   지도 표시 : 해당 서비스 제공 위치를 지도로 표시해줍니다.

## 실행

### 1. 코드 클론

```
git clone https://github.com/Commeci/publicService.git
```

### 2. env.js 파일 생성

```javascript
export const env = {
    API_KEY: "YOUR_API_KEY",
};
// 서울 열린데이터 광장 API KEY
```

### 3. publicService.html 파일 수정

```html
<script
    type="text/javascript"
    src="//dapi.kakao.com/v2/maps/sdk.js?appkey={YOUR_API_KEY}"
></script>
<!-- kakaomap API KEY -->
```

### 4. 코드 실행

-   코드를 실행하면 사이트를 볼 수 있습니다.

## 기술

-   HTML, CSS, JavaScript
-   kakaomap api
-   서울 열린데이터 광장 api
