import { useState } from 'react';
import './findAccountForm.scss';

interface FindAccountFormProps {
  isFindId: boolean;
  //   onSubmit: React.MouseEventHandler<HTMLInputElement>;
}

const FindAccountForm = ({ isFindId }: FindAccountFormProps) => {
  const [isOkay, setIsOkay] = useState(false);

  const hadnleEmailSubmt = () => {
    setIsOkay(!isOkay);
  };
  const hadnlePwSubmit = () => {
    setIsOkay(!isOkay);
  };
  return (
    <div className="find-account-form">
      <div className="input-container">
        {isFindId ? (
          isOkay ? (
            <>
              <span className="title">이메일 찾기</span>
              <span className="description">
                {`아이디 찾기가 완료되었습니다.`}
              </span>
              <div>frfr0723@gmail.com</div>
            </>
          ) : (
            <>
              <span className="title">이메일 찾기</span>
              <span className="description">
                {`회원정보에 등록한 휴대전화를 입력해 주세요.`}
              </span>
              <label className="auth-input-field">
                휴대전화 번호
                <input
                  type="text"
                  name="name"
                  placeholder="휴대전화 번호를 입력해 주세요"
                />
              </label>
            </>
          )
        ) : isOkay ? (
          <>
            <span className="title">비밀번호 재설정</span>
            <span className="description">
              {`새롭게 설정할 비밀번호를 입력해 주세요.`}
            </span>
            <label className="auth-input-field">
              새로운 비밀번호
              <input
                type="text"
                name="name"
                placeholder="영문자, 솟자, 특수문자 포함 최소 8~20자"
              />
            </label>
            <label className="auth-input-field">
              비밀번호 확인
              <input
                type="text"
                name="name"
                placeholder="비밀번호를 확인해 주세요"
              />
            </label>
          </>
        ) : (
          <>
            <span className="title">비밀번호 재설정</span>
            <span className="description">
              {`비밀번호를 재설정 할 이메일을 입력해 주세요.\n입력된 메일로 자세한 안내를 보내드립니다`}
            </span>
            <label className="auth-input-field">
              비밀번호를 재설정 할 이메일
              <input
                type="text"
                name="name"
                placeholder="이메일을 입력해 주세요"
              />
            </label>
          </>
        )}
        <input
          className={`submit-btn active `}
          type="submit"
          onClick={isFindId ? hadnleEmailSubmt : hadnlePwSubmit}
          value={`${isFindId ? (isOkay ? '확인' : '아이디 찾기') : isOkay ? '저장하기' : '비밀번호 찾기'}`}
        />
      </div>
    </div>
  );
};

export default FindAccountForm;
