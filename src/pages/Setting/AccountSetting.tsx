import { useState } from 'react';
import './accountSetting.scss';
import { Avatar } from '@mui/material';

const AccountSetting = () => {
  // const [users, setUsers] = useState({
  //   profileImageUrl: '',
  //   nickname: '',
  //   birth: '',
  //   phone: '',
  // });

  // useEffect(() => {
  //   async function getUser() {
  //     const respones = await getUser();
  //     console.log('response:' + respones);
  //   }

  //   getUser();
  // }, []);

  const [isEditMode, setIsEditMode] = useState(false);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  const handleSave = () => {};

  return (
    <div>
      <div className="setting__wrapper">
        <div className="setting__title">계정 관리</div>
        <div className="setting__container">
          <div className="setting__name">기본 정보</div>
          {isEditMode ? (
            <div className="setting__content">
              <div className="user__image">
                <Avatar sx={{ width: 124, height: 124 }}> PS</Avatar>
                <div className="image-edit-btn"></div>
              </div>
              <label className="edit__field">
                닉네임
                <input type="text" value={'bymine'} />
              </label>
              <button>수정하기</button>
              <label className="edit__field">
                이메일
                <input type="text" value={'bymine'} />
              </label>
              <label className="edit__field">
                휴대폰 번호
                <input type="text" value={'bymine'} />
              </label>
              <div className="edit-btns">
                <button className="setting__edit" onClick={handleCancel}>
                  취소
                </button>
                <button className="setting__edit" onClick={handleSave}>
                  저장
                </button>
              </div>
            </div>
          ) : (
            <div className="setting__content">
              <Avatar sx={{ width: 124, height: 124 }}> PS</Avatar>
              <span>bymine</span>
              <span>1997-07-23</span>
              <span>
                frfr0723@gmail.com <span>✔️ 인증 완료</span>
              </span>
              <span>
                010-9663-6696 <span>✔️ 인증 완료</span>
              </span>
              <button className="setting__edit" onClick={handleEdit}>
                수정
              </button>
            </div>
          )}
        </div>
        <div className="setting__container">
          <div className="setting__name">비밀번호</div>
          <div className="setting__content">
            <span>최근 업데이트:2021-11-10</span>
            <span>비밀번호</span>
            <button>비밀번호 변경</button>
          </div>
        </div>
        <div className="setting__container">
          <div className="setting__name">비밀번호</div>
          <div className="setting__content">
            <span>최근 업데이트:2021-11-10</span>
            <span>비밀번호</span>
            <button>비밀번호 변경</button>
          </div>
        </div>
        <div className="setting__container">
          <div className="setting__name">계정 삭제</div>
          <div className="setting__content">
            <span>계정 삭제 시 프로필 및 사용자 정보가 삭제 됩니다.</span>
            <button>삭제하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
