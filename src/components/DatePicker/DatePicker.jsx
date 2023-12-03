import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({ date, setDate, value }) => {
  return (
    <DatePicker
      selected={date}
      onChange={(date) => setDate(date)}
      showTimeSelect
      //   defaulValue={value}
      className="w-full rounded-md"
      placeholderText="Select Date"
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
};

export default DatePickerComponent;
