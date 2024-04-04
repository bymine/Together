import './channelCard.css';

interface ChannelCardProps {
  isFold: boolean;
}

const ChannelCard = ({ isFold }: ChannelCardProps) => {
  return (
    <div className="channelCard">
      <div className="channel__header">
        <div className="channel__image"></div>
        <div className="channel__title">리엑트 스터디</div>
        <div className="channel__icon"></div>
      </div>
      {isFold ? (
        <></>
      ) : (
        <ul className="channel__menu">
          <li>설정</li>
          <li>일정</li>
          <li>이슈</li>
          <li>채팅</li>
          <li>문서</li>
          <li>드라이브</li>
        </ul>
      )}
    </div>
  );
};

export default ChannelCard;
