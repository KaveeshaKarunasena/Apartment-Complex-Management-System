import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";

import './Calender.css'

const CalenderComp = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  return (
    <div className="ParentComp">
      <h3>Calender</h3>
    <Calendar
          value={selectedDay}
          onChange={setSelectedDay}
          calendarClassName="responsive-calendar" // added this
          shouldHighlightWeekends
        />
    </div>
    
  );
};

export default CalenderComp
