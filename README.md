# VSK

📁 project-root/
├── 📁 public/ # 정적 파일 (이미지, 동영상, 아이콘 등)
│ ├── 📁 images/ # 이미지 (로고, 배너 등)
│ ├── 📁 videos/ # 강의 예제 동영상 또는 홍보용 동영상
│ └── favicon.ico # 브라우저 탭에 표시될 사이트 아이콘
│
├── 📁 src/ # 전체 프로젝트 소스 코드
│ ├── 📁 pages/ # Next.js의 라우트 파일들
│ │ ├── 📁 api/ # Next.js API 라우트 (백엔드 기능 제공)
│ │ │ ├── auth/ # 인증 관련 API (로그인, 회원가입 등)
│ │ │ ├── courses/ # 강의 관련 데이터 API (목록, 상세보기, 등록)
│ │ │ ├── payments/ # 결제 관련 API
│ │ │ └── users/ # 사용자 정보 API
│ │ ├── \_app.tsx # 글로벌 레이아웃, 상태 관리 설정
│ │ ├── \_document.tsx # HTML 문서의 기본 설정
│ │ ├── index.tsx # 메인 페이지
│ │ ├── login.tsx # 로그인 페이지
│ │ ├── register.tsx # 회원가입 페이지
│ │ ├── courses/ # 강의와 관련된 페이지
│ │ │ ├── index.tsx # 강의 리스트 페이지
│ │ │ ├── [id].tsx # 강의 상세 페이지
│ │ │ ├── create.tsx # 강의 등록 페이지 (강사용)
│ │ ├── profile/ # 사용자 프로필 관련 페이지
│ │ │ ├── index.tsx # 내 프로필 보기
│ │ │ └── edit.tsx # 프로필 수정 페이지
│ │ ├── order/ # 결제 관련 페이지
│ │ │ └── success.tsx # 결제 성공 페이지
│ │ ├── watch/[id].tsx # 강의 시청 페이지
│ │ └── ...추후 추가 라우트
│ │
│ ├── 📁 components/ # 재사용 가능한 React 컴포넌트들
│ │ ├── 📁 common/ # 공통 컴포넌트 (헤더, 푸터, 버튼 등)
│ │ │ ├── Header.tsx
│ │ │ ├── Footer.tsx
│ │ │ ├── Navbar.tsx
│ │ │ └── Spinner.tsx # 로딩 스피너
│ │ ├── 📁 courses/ # 강의 관련 UI 컴포넌트
│ │ │ ├── CourseCard.tsx # 강의 카드
│ │ │ ├── CourseFilter.tsx # 필터링 UI
│ │ │ └── CourseList.tsx # 강의 리스트
│ │ ├── 📁 forms/ # 폼과 관련된 컴포넌트
│ │ │ ├── LoginForm.tsx
│ │ │ ├── RegisterForm.tsx
│ │ │ └── CourseForm.tsx # 강의 등록 폼
│ │ └── 📁 reviews/ # 리뷰/평점 관련 컴포넌트
│ │ ├── ReviewList.tsx
│ │ └── ReviewForm.tsx
│ │
│ ├── 📁 hooks/ # 재사용 가능한 커스텀 훅
│ │ ├── useAuth.ts # 인증 상태 확인 훅
│ │ ├── useCourses.ts # 강의 데이터 관련 커스텀 훅
│ │ └── usePayment.ts # 결제 관련 로직
│ │
│ ├── 📁 contexts/ # 상태 관리 (React Context API)
│ │ ├── AuthContext.ts # 로그인/회원 정보 관리
│ │ ├── ToastContext.ts # 알림 메시지
│ │ └── ThemeContext.ts # 다크/라이트 모드 관리
│ │
│ ├── 📁 utils/ # 유틸리티 함수 (재사용 가능한 함수들)
│ │ ├── apiClient.ts # API 요청 관련 함수
│ │ ├── formatDate.ts # 날짜 포맷팅 함수
│ │ └── constants.ts # 상수 데이터 (API URL, 에러 메시지 등)
│ │
│ ├── 📁 styles/ # 전역 및 컴포넌트 스타일
│ │ ├── globals.css # 전체 공통 스타일
│ │ ├── Home.module.css # 메인 페이지 전용 스타일
│ │ └── ... # 추가 컴포넌트 및 페이지 스타일
│ │
│ └── 📁 lib/ # 외부 서비스와 관련된 코드 (결제 연동 등)
│ ├── stripe.ts # Stripe 결제 관련 설정
│ ├── firebase.ts # Firebase 연동 (로그인/이미지 업로드 등)
│ └── i18n.ts # 다국어 지원 설정
│
├── 📄 package.json # 프로젝트 의존성, 스크립트
├── 📄 tsconfig.json # TypeScript 설정 (선택 사항)
├── 📄 next.config.js # Next.js 환경설정
├── 📄 .eslintrc.js # ESLint 설정 파일
└── 📄 .gitignore # Git에 포함하지 않을 파일 목록
