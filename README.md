# 여행발자국 Frontend

여행 기록을 작성하고 공유하는 웹 서비스의 React Frontend입니다.
게시글 조회·작성·수정, 지역 및 해시태그 검색, 다중 이미지, 댓글·좋아요와 회원 화면을 제공합니다. Backend는 별도 저장소에서 관리하며 Docker Compose로 함께 배포합니다.

- [Backend 저장소](https://github.com/100-hours-a-week/KTB4_Jettie_BE)

## 프로젝트 소개

- 17개 지역 필터와 해시태그를 조합한 여행 기록 조회
- 최신순·좋아요순·조회수순 정렬과 무한 스크롤 목록
- 다중 이미지 게시글 작성·수정 및 상세 캐러셀
- 댓글과 좋아요, 작성자 전용 수정·삭제 UI
- JWT 기반 Backend API와 연동되는 회원 및 마이페이지 화면
- React Router SPA를 Docker와 Nginx로 정적 배포

## 개발 기간 및 인원

- 개발 기간: 2026-05-25 ~ 2026-08-09
- 개발 인원: 1명 (Frontend / Backend)

## 주요 기능

### User

- 회원가입·로그인 폼에서 이메일, 비밀번호, 닉네임 입력값 검증
- 프로필 이미지 선택 시 미리보기 제공 및 회원정보 수정 API 연동
- 현재 비밀번호 확인 후 새 비밀번호 변경 처리
- 로그아웃·회원 탈퇴 시 저장된 인증 정보 정리 및 화면 이동

### Post

- 전체 게시글과 로그인 사용자의 게시글 목록 조회
- 최신순·좋아요순·조회수순 정렬 UI 제공
- 17개 지역 필터와 해시태그 검색 조건을 조합해 목록 조회
- 게시글 상세·작성·수정·삭제 화면 및 API 연동
- 제목·내용·지역·이미지의 필수값과 입력 제한 검증
- 로그인 사용자와 작성자 정보를 비교해 수정·삭제 UI 노출 제어

### Comment / Like

- 댓글 등록·수정·삭제 후 최신 댓글 목록 재조회
- 좋아요 상태에 따른 UI 변경과 좋아요·취소 API 연동
- 작성자에게만 댓글 수정·삭제 UI 표시

### Image

- 게시글당 이미지 1장 이상 10장 이하 선택
- `multiple` 파일 입력과 선택 이미지 미리보기
- 상세 화면에서 이전·다음 버튼과 현재 순서를 제공하는 이미지 캐러셀
- 수정 화면에서 기존 이미지 유지·삭제, 새 이미지 추가, 위·아래 순서 변경
- 첫 번째 이미지를 대표 이미지로 표시

### Hashtag

- 게시글당 최대 5개, 태그당 최대 20자 입력 검증
- `#`, 내부 공백, 중복 태그 입력 방지 및 개별 삭제
- 작성·수정 요청 시 `FormData`에 해시태그 목록 전달
- 게시글 카드와 상세 화면의 태그 클릭 시 해당 해시태그 검색으로 이동

### 목록 로딩

- 전체 게시글과 나의 기록에 페이지 단위 무한 스크롤 적용
- `isLoadingRef`로 연속 스크롤 이벤트의 중복 요청 차단
- `requestVersionRef`로 변경 전 필터·정렬 요청 결과 무효화
- 게시글 ID 기준으로 목록을 병합해 다음 페이지 중복 항목 제거

## 사용 기술

| 구분     | 기술                               |
| -------- | ---------------------------------- |
| Frontend | React 19.2, JavaScript, HTML, CSS  |
| Routing  | React Router DOM 7.18              |
| Build    | Vite 8.1                           |
| API      | Fetch API, FormData                |
| State    | React Context, Hooks, localStorage |
| Quality  | ESLint 10                          |
| Infra    | Docker, Nginx                      |
| CI       | GitHub Actions                     |

## 프로젝트 구조

```text
KTB4_Jettie_FE/
├── .github/
│   └── workflows/
│       └── frontend-ci.yml
├── public/
│   ├── fonts/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── api/          # 공통 API 요청 함수
│   ├── components/   # 공통 헤더와 인증 보호 Route
│   ├── context/      # 로그인 상태 Context
│   ├── hooks/        # 인증 Context 접근 Hook
│   ├── pages/        # 화면별 JSX와 CSS
│   ├── router/       # React Router 경로
│   ├── utils/        # 인증 저장소와 URL 변환
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── Dockerfile
├── nginx.conf
├── package.json
└── vite.config.js
```

## 페이지 구조

| 페이지        | 경로                  | 접근   | 주요 기능                                   |
| ------------- | --------------------- | ------ | ------------------------------------------- |
| 게시글 목록   | `/posts`              | 공개   | 정렬, 지역 필터, 해시태그 검색, 무한 스크롤 |
| 로그인        | `/login`              | 공개   | 이메일·비밀번호 로그인                      |
| 회원가입      | `/signup`             | 공개   | 회원정보와 선택 프로필 이미지 등록          |
| 게시글 상세   | `/posts/:postId`      | 로그인 | 이미지 캐러셀, 댓글, 좋아요, 수정·삭제 이동 |
| 게시글 작성   | `/posts/create`       | 로그인 | 지역·해시태그·다중 이미지 입력              |
| 게시글 수정   | `/posts/:postId/edit` | 로그인 | 기존·신규 이미지와 해시태그 수정            |
| 회원정보 수정 | `/users/me`           | 로그인 | 닉네임·프로필 이미지 수정, 회원 탈퇴        |
| 비밀번호 수정 | `/users/me/password`  | 로그인 | 현재·새 비밀번호 검증 및 변경               |
| 나의 기록     | `/users/me/posts`     | 로그인 | 본인 게시글 수, 정렬, 무한 스크롤           |

## 라우팅

- `BrowserRouter`, `Routes`, 중첩 `Route`로 SPA 경로 구성
- 공개 목록·로그인·회원가입과 인증 보호 화면 분리
- 공통 헤더의 뒤로가기는 브라우저 방문 기록을 우선 사용하고 기록이 없으면 화면별 기본 경로 사용
- 상세 화면의 해시태그 클릭 시 `/posts?hashtag={태그}`로 이동
- Frontend Nginx의 `try_files $uri $uri/ /index.html` 설정으로 직접 접근과 새로고침 지원

## API 연동

`src/api/api.js`의 `apiFetch`가 인증이 필요한 요청을 공통 처리합니다.

- Backend API 요청에 `/api` prefix 추가
- `/uploads/` 요청은 prefix를 추가하지 않고 별도 경로 유지
- localStorage의 Access Token을 `Authorization: Bearer {token}` 헤더에 추가
- JSON 요청에만 `Content-Type: application/json` 자동 지정
- `FormData` 요청은 브라우저가 multipart boundary를 생성하도록 헤더를 직접 지정하지 않음
- 401 응답 시 저장된 로그인 정보를 제거하고 로그인 화면으로 이동
- 403 응답의 Backend 메시지를 Error 객체로 전달

로그인과 회원가입은 인증 전 요청이므로 각각 `/api/users/login`, `/api/users/signup`을 Fetch API로 직접 호출합니다.

## 인증 처리

- 로그인 응답의 Access Token과 사용자 정보를 localStorage에 저장
- `AuthProvider`를 통해 로그인 상태를 React Context로 관리
- 로그인·로그아웃·회원정보 변경 시 인증 상태를 갱신
- 인증이 필요한 화면은 `ProtectedRoute`로 접근 제어

## 이미지 처리

- `URL.createObjectURL()`을 이용해 선택한 이미지의 미리보기 제공
- 수정 화면에서 기존 서버 이미지와 신규 이미지를 구분해 유지·삭제·추가 및 순서 변경 처리
- 이미지와 순서 정보를 `FormData`로 Backend에 전달
- 사용이 끝난 Object URL은 `URL.revokeObjectURL()`로 정리

## 서비스 화면

### 로그인 / 회원가입

![로그인](images/로그인.png)
![회원가입](images/회원가입.png)

### 게시글

#### 게시글 목록

![게시글목록](images/게시글목록.png)

#### 게시글 상세

![게시글상세](images/게시글상세.png)

#### 게시글 수정

![게시글수정](images/게시글수정.png)

#### 게시글 삭제

![게시글삭제](images/게시글삭제.png)

### 댓글

#### 댓글 목록

![댓글목록](images/댓글목록.png)

#### 댓글 수정

![댓글수정](images/댓글수정.png)

#### 댓글 수정 완료

![댓글수정완료](images/댓글수정완료.png)

#### 댓글 삭제

![댓글삭제](images/댓글삭제.png)

### 정보수정

#### 비밀번호수정

![비밀번호수정](images/비밀번호수정.png)

#### 회원정보수정

![회원정보수정](images/회원정보수정.png)

#### 회원정보수정 완료

![회원정보수정완료](images/회원정보수정완료.png)

#### 회원 탈퇴

![회원탈퇴](images/회원탈퇴.png)

## 배포 구조

Frontend Dockerfile은 multi-stage build를 사용합니다.

```text
Node.js 22 builder
  -> npm ci
  -> Vite production build
  -> dist 생성

Nginx runtime
  -> dist 정적 파일 제공
  -> React Router SPA fallback
```

## 프로젝트 후기

회원가입과 로그인, 게시글 같은 기본 기능부터 무한 스크롤, 이미지 업로드 등 다양한 기능을 구현하며 React에서 상태가 변경되고 화면이 다시 렌더링되는 흐름을 경험했습니다. 특히 여러 화면에서 공통으로 사용하는 인증 상태를 Context로 관리하고 공통 API 요청 함수를 통해 Backend와 연결하면서 단순히 화면을 만드는 것보다 애플리케이션 전체 흐름을 생각하게 되었습니다.
이번 프로젝트를 진행하며 기존 HTML, CSS, JavaScript 중심의 개발에서 React 기반의 SPA 구조로 확장할 수 있었고, 앞으로는 이번 프로젝트에서 아쉬웠던 구조를 개선하며 React를 더 깊개 공부해 보고 싶습니다.
