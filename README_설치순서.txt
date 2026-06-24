동기화 메모장 V2 설치 순서

1. Google Sheets 새 문서 생성
2. 확장 프로그램 > Apps Script
3. google_apps_script.gs 내용 전체 붙여넣기
4. 배포 > 새 배포 > 웹 앱
5. 실행 사용자: 나
6. 액세스 권한: 모든 사용자
7. 배포 후 웹 앱 URL 복사
8. index.html에서 아래 줄 찾기

const SCRIPT_URL = "PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

9. 따옴표 안에 웹 앱 URL 붙여넣기
10. index.html, manifest.json, service-worker.js, icon 파일들을 GitHub Pages에 업로드

사용:
- 제목/내용 수정하면 0.8초 후 자동동기화
- 핸드폰에서 저장하면 노트북에서도 같은 주소로 확인
- 노트북에서 수정하면 핸드폰에서 새로고침으로 반영
