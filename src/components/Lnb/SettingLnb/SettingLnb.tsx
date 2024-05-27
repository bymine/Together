import './settingLnb.scss';

const SettingLnb = () => {
  return (
    <div className="setting__wrapper">
      <div className="setting__lnb">
        <div className="setting__container">
          <span className="setting__title">내 정보 관리</span>
          <a href="/users/profile" className="active">
            <span>계정 관리</span>
          </a>
          <a href="/users/alarm">
            <span>알림 설정</span>
          </a>
          <a href="/users/resume">
            <span>내 프로필</span>
          </a>
        </div>
        <div className="setting__container">
          <span className="setting__title">커리어 관리</span>
          <a href="#">
            <span>이력서</span>
          </a>
          <a href="#">
            <span>지원한 포지션</span>
          </a>
          <a href="#">
            <span>받은 제안</span>
          </a>
          <a href="#">
            <span>접수한 채용 프로그램</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SettingLnb;
