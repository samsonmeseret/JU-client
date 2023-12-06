import { useState, useEffect } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function ViewOnlyCalendar({ events, name }) {
  return (
    <div>
      <section></section>
      <div className="flex justify-between items-center p-3">
        <h1 className="text-xl font-bold">{name} Calender</h1>
      </div>
      <section className="p-3">
        <Fullcalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={{
            start: "today prev,next", // will normally be on the left. if RTL, will be on the right
            center: "title",
            end: "dayGridYear, dayGridMonth, timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
          }}
          height={"90vh"}
          //   dateClick={handleDateClick}
          events={events}
          //   eventClick={handleEventClick}
        />
      </section>
    </div>
  );
}

export default ViewOnlyCalendar;
