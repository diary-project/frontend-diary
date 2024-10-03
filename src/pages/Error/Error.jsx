import React from 'react';

function Error() {
  return (
    <div>
      <p>예상치 못한 오류로 로그인에 실패했습니다.</p>
      <div>
        <button>오류리포트</button>
        <button>로그인 페이지로 돌아가기</button>
      </div>
    </div>
  );
}

export default Error;
