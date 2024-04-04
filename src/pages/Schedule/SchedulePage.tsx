import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import './schedulePage.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
const localizer = momentLocalizer(moment);

// 이벤트 타입 정의
interface MyEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

const events: MyEvent[] = [
  {
    id: 1,
    title: 'Event 1',
    start: new Date(2024, 3, 1),
    end: new Date(2024, 3, 3),
  },
  {
    id: 2,
    title: 'Event 2',
    start: new Date(2024, 3, 5),
    end: new Date(2024, 3, 6),
  },
  {
    id: 3,
    title: 'Event 3',
    start: new Date(2024, 3, 17),
    end: new Date(2024, 3, 20),
  },
];
const SchedulePage = () => {
  const [selectedEvent, setSelectedEvent] = useState<MyEvent | null>(null); // 선택된 이벤트 상태

  const handleSelectEvent = (event: MyEvent) => {
    setSelectedEvent(event);
    setIsDetailMode(true);
  };

  const [isDetailMode, setIsDetailMode] = useState(false);

  return (
    <div className="schedule">
      <div className="schedule__filter-container">
        <input type="text" placeholder="입력해주세요" />
        <div>
          <select name="일정 타입" id="일정" value="일정 타입">
            <option value="option1">option1</option>
            <option value="option2">option2</option>
            <option value="option3">option3</option>
          </select>
          <select name="일정 타입" id="일정" value="일정 타입">
            <option value="option1">option1</option>
            <option value="option2">option2</option>
            <option value="option3">option3</option>
          </select>
        </div>
      </div>
      <div className="calendar__content">
        <Calendar
          className="calendar"
          localizer={localizer}
          defaultView="month"
          events={events} // Add events prop
          style={{ height: '100%' }}
          onSelectEvent={handleSelectEvent}
        />
        {isDetailMode ? (
          <div className="calednar__detail">
            <div
              className="cancel_detail"
              onClick={() => {
                setIsDetailMode(false);
              }}></div>
            <div className="detail1">
              <p>{selectedEvent?.title}</p>
              <p>{selectedEvent?.start.toLocaleString()}</p>
            </div>
            <div className="detail1"></div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SchedulePage;
