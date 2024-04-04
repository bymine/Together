import './navbar.css';
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <div className="navbar__menu-icon"></div>
        <p>Together</p>
      </div>
      <div className="navbar__user">
        <div className="navbar__user-image"></div>
        <div className="navbar__user-info">
          <p>Bymine</p>
          <p>수원대학교</p>
        </div>
        <div className="navbar__alert">
          <div className="message">
            <div className="message_icon"></div>
            <div className="message_count">3</div>
          </div>
          <div className="alarm">
            <div className="alarm_icon"></div>

            <div className="alarm__update"></div>
          </div>
        </div>
      </div>
      <div className="navbar__input-box">
        <input
          type="text"
          className="navbar__search"
          placeholder="검색어를 입력하세요"
        />
        <div className="input-suffix"></div>
      </div>

      <div className="navbar__setting"></div>
    </div>
  );
};

export default Navbar;
