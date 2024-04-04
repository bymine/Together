import ChannelCard from '../ChannelCard/ChannelCard';
import './leftNavbar.css';
const LeftNavbar = () => {
  return (
    <div className="leftNavbar">
      <div className="leftNavbar__dash-btn">
        <div className="dash-icon"></div>
        <span>대시보드</span>
      </div>
      <ChannelCard isFold={true} />
      <ChannelCard isFold={false} />
      <ChannelCard isFold={true} />
    </div>
  );
};

export default LeftNavbar;
