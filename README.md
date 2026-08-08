# 여행발자국 Frontend

여행 기록을 작성하고 지역·해시태그별 게시글을 조회하는 여행발자국 서비스의 React 프론트엔드입니다. 백엔드는 별도의 `KTB4_Jettie_BE` 저장소에서 관리합니다.

## 기술 스택

- React 19
- Vite
- React Router
- Nginx
- Docker

## 로컬 실행

Node.js 22 환경을 권장합니다.

```bash
npm ci
npm run dev
```

개발 서버는 `/api`와 `/uploads` 요청을 기본적으로 `http://localhost:8080`의 로컬 백엔드로 프록시합니다.

## 검사 및 빌드

```bash
npm run lint
npm run build
```

빌드 결과는 `dist/`에 생성됩니다.

## Docker

프론트엔드 Dockerfile은 React를 빌드한 후 Nginx에서 정적 파일을 제공합니다. `nginx.conf`의 SPA fallback으로 새로고침 시에도 React Router 경로가 유지됩니다.

```bash
docker build -t jettie-frontend .
docker run --rm -p 3000:80 jettie-frontend
```

전체 서비스 통합 실행은 형제 디렉터리에 clone한 Backend 저장소의 `deployment/docker-compose.yml`을 사용합니다.

```text
/home/ubuntu/
├── KTB4_Jettie_FE/
└── KTB4_Jettie_BE/
    └── deployment/
```

프론트엔드 단독 컨테이너는 정적 파일 제공만 담당하며, `/api`와 `/uploads` reverse proxy는 Backend 저장소의 통합 Nginx 설정이 담당합니다.
