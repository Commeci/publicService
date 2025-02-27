# 서울특별시 교육 공공서비스 예약
## 📱 프로젝트 소개

서울 교육 공공서비스 예약 웹사이트는 서울시의 교육 관련 공공 서비스를 온라인으로 예약할 수 있는 사이트입니다. 이 웹사이트는 서울 열린데이터 광장 홈페이지의 서울시 교육 공공서비스예약 정보 api및 kakaoMap api를 활용하고 있습니다.

### 🔗 관련 링크
**[서울 열린데이터 광장 - 교육 공공서비스 예약 정보](https://data.seoul.go.kr/dataList/OA-2268/S/1/datasetView.do)**

![image 74](https://github.com/user-attachments/assets/f4521728-670c-475d-b784-33fc6b368497)

![image 75](https://github.com/user-attachments/assets/664c6a8b-a67f-49ec-bc9b-106e7b4a9d89)

![image 76](https://github.com/user-attachments/assets/e385db9d-21a1-4f63-bf8c-18a6afaa4dfc)
![image 77](https://github.com/user-attachments/assets/140759d5-4a7b-422e-8cb9-b04b2680412a)

- 서비스 검색 (검색은 소분류, 지역, 제목으로 검색 기능 제공)
- 서비스 예약 (예약 링크를 통해 원하는 교육 서비스 예약)
- 지도 제공 (해당 서비스 제공 위치를 지도로 표시)

## 🛠 주요 기능

### 1. 서비스 검색 시스템
- 지역, 제목으로 교육 서비스 검색
- 페이지네이션으로 여러 서비스 결과 탐색

### 2. 서비스 상세 정보
- 교육 서비스 상세 설명 제공
- 예약하러가기 버튼으로 원스톱 예약

### 3. 지도 기반 위치 정보
- 카카오맵 연동 위치 확인
- 서비스 제공 장소 정확한 위치 표시
- 마커를 통한 직관적인 위치 파악

### 4. 카테고리 분류 시스템
- 교육 서비스 카테고리별 분류
- 스와이퍼를 통한 카테고리 탐색
- 메뉴를 통한 체계적인 서비스 접근

### 5. 사용자 경험
- 반응형 디자인으로 모바일/데스크톱 최적화
- 직관적인 UI로 쉬운 서비스 탐색
- 상세 정보와 지도 통합 제공

## 👥 개발
### 프론트엔드
|<img src="https://github.com/user-attachments/assets/f7307fcd-5554-4256-a515-75ce42874c4b" width="160" height="160">|
|:---:|
|이가은|
|[Commeci](https://github.com/Commeci)|

## 🔧 기술 스택

### Frontend
![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### 도구 및 API
[![서울열린데이터](https://img.shields.io/badge/서울열린데이터-003399?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHmSURBVDiNjZK9S1thFMZ/9yZKBpWCQwZBpBQRQcjg0KFDxEGQDiJCh0LGgA4OGTKIQyCLS4dCIWNwqEtBSIeClIJglZBFUShkEEEyFAqCpMb745z3Xkni9T3Lcw7P85zzfEdUVQAHCIFPwHvgKZAHJsAvoC8iQ1S1BXwHijiOg+u6OI6DiJBIJBARVJV4PEZEiKKIIAiYzWYAU6CuqnoS2AMKrusyn89ZLpfEccx0OmWxWBBFEbPZjMViQRRFTCYTptMpcRzjOA6qWgE+i8gHYK/ZbNJut9ne3mZra4utrS3K5TLlcplSqUSpVKJYLFIoFNjY2CAIAqIoIpfLoapvgD5Qz+fzrFYrdrfBw8PDR/V6/TlQVdWaiJDNZsnlcuRyOTKZDOl0mnQ6TSqVIpVKkUwmSaVSJBIJ0uk0mUyGbDZLJpMhDEMAVUSkhYgQhiHD4ZDBYMBgMOD6+pqrqyv6/T79fp/Ly0t6vR7n5+ecnZ1xenrKyckJx8fHHB0d0e12OTg4wPM8gJaqasEYg+/7+L6P53m4rovruriui+M4GGMwxhCGIWEYYozBGEMQBPi+j+/7dDodOp0OvV4PoC4iQ1RVRWQIfARqwDNgHbgB/gB9ERmiquuq+gL4D9rVMmCFw4WaAAAAAElFTkSuQmCC&logoColor=white)](https://data.seoul.go.kr/dataList/OA-2268/S/1/datasetView.do)
![KakaoMap](https://img.shields.io/badge/KakaoMap-FFCD00?style=for-the-badge&logo=kakao&logoColor=black)




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


