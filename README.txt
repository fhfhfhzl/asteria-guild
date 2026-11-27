아스테리아: 길의 등불 v4.60

실행: 압축 해제 후 VS Code Live Server로 index.html 열기.
또는 폴더에서 python -m http.server 8000 실행 후 http://localhost:8000 접속.
GitHub Pages에서도 폴더 구조 유지. file:// 직접 실행 미지원.

js/main.js: 41개 소스 파일을 기존 순서대로 읽는 로더.
js/01~41: 기능 및 업데이트 단위 소스. 전역 스코프 유지.
css/01~12: 기존 스타일 순서 유지.
assets/: 기존 이미지 유지.
portraits.json: 기존 초상 데이터. 다른 데이터는 아직 각 JS에 포함.
sw.js: 분리된 소스를 캐시.

이번 변경은 소스 분리이며 ES module 전환 및 중복 코드 제거는 아직 하지 않았습니다.
기존 저장 키 유지. 다른 주소/포트에서는 이전 저장 파일을 가져오세요.


v4.62: data/ JSON 파일 10개로 원본 데이터 분리. hero-dialogues는 기본 일상, hero-serious/sad/surprised/tired는 추가 장면, hero-paired는 동반 대화. characters.json은 초상화 경로 매핑. Live Server에서 실행. 기존 portraits.json은 호환용.

16-save.js: 저장 및 복구. data/balance.json: 기존 경제/성장 수치. 신규 이벤트 JSON 2종. 기존 클래식 스크립트 실행 순서 유지.

v4.63: 시민/계절/연속 의뢰 및 사건 데이터는 data/citizen-events.json으로 분리. JSON과 JS 병렬 로딩. CSS에서 인접한 완전 동일 선언만 제거. 기존 전역 렌더 체인은 유지.

 v4.64: 55 new illustrated assets. Items not present in the game and extra collectible icons are reserved for future use.


v4.65: 80 monster illustrations and 12 food assets; 9 food names mapped to existing shop entries. Monster artwork is provisional where visual anatomy differs from the data. No gameplay data changed.


v4.66: 의상 3종, 장소 배경 19종, 장비 그림 10종 추가. Live Server로 실행.

v4.67: 대회 4종, 연애 6종, 직업 엔딩 9종 CG 추가. 연애 장면은 지아 단독 이미지. 축제/초대/일상 CG는 보관용.

v4.68: 길드 결과별 지아 CG 5장과 건물 CG 5장 연결. 기존 엔딩 조건 유지. 마지막 인사는 전용 원본 미확인으로 기존 생존 엔딩 배경의 문구 없는 부분을 임시 사용.

v4.69: 확정 지아 마지막 인사 CG 연결 및 서비스워커 캐시 갱신.

v4.70: 실행용 JS/JSON 통합 번들 추가, 타이틀 버전 수정, 서비스워커 업데이트 방식 개선. 원본 JS와 JSON은 개발용으로 유지. 수정 후에는 game-bundle.js를 다시 생성해야 함.

4.71: 메인 배경/마을 아이콘 및 모바일 타이포그래피 개선.
