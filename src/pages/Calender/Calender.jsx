import { useState, useEffect } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { axiosInstance } from "../../api/axios";
import { Box, Modal } from "@mui/material";
import CompLoader from "../../components/CompLoader";
import DatePicker from "../../components/DatePicker/DatePicker";
import { setHours, setMinutes } from "date-fns";
import { ToastContainer, toast } from "react-toastify";

function Calendar() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEdditing, setIsEdditing] = useState(false);
  const [singleEvent, setSingleEvent] = useState({});

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );
  const [endDate, setEndDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 800,
    height: "500px",
    overflowY: "scroll",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "7px",
    boxShadow: 24,
    p: 4,
  };

  const handleDateClick = (e) => {};
  const handleEventClick = (e) => {
    const eventId = e?.event?._def?.publicId;
    let eventToBeUpdated = events.find((event) => event.id == eventId);
    setSingleEvent(eventToBeUpdated);
    setStartDate(new Date(eventToBeUpdated.start));
    setEndDate(new Date(eventToBeUpdated.end));
    setIsEdditing(true);
    setOpen(false);
  };

  const SubmitEvent = (e) => {
    e.preventDefault();

    if (!title || !startDate || !endDate) {
      setError("please enter required fields above");
    } else {
      setIsLoading(true);
      axiosInstance
        .post("/events", { title, start: startDate, end: endDate })
        .then((data) => {
          setIsLoading(false);
          setTitle("");
          setStartDate("");
          setEndDate("");
          setOpen(false);
          toast.success("Event Created Successfully", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          fetchEvents();
        })
        .catch((err) => {
          toast.error("Something went wrong", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }
  };

  const fetchEvents = async () => {
    axiosInstance
      .get("/events")
      .then((data) => {
        // console.log(data.data);
        setEvents(data.data);
      })
      .catch((err) => {});
  };

  const UpdateEvent = async (e) => {
    e.preventDefault();
    let obj = {};
    if (!title) {
      obj.title = singleEvent.title;
    } else {
      obj.title = title;
    }
    if (!startDate) {
      obj.start = singleEvent.start;
    } else {
      obj.start = startDate;
    }
    if (!endDate) {
      obj.end = singleEvent.end;
    } else {
      obj.end = endDate;
    }
    axiosInstance
      .patch(`/events/${singleEvent.id}`, obj)
      .then(() => {
        setIsLoading(false);
        setTitle("");
        setStartDate("");
        setEndDate("");
        setIsEdditing(false);
        toast.success("Event Updated Successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        fetchEvents();
      })
      .catch(() => {
        toast.error("Something went wrong", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });

    // console.log(obj);
  };

  const deleteEvent = async (e) => {
    e.preventDefault();
    // console.log(singleEvent);
    axiosInstance
      .delete(`/events/${singleEvent.id}?userId=${singleEvent.UserId}`)
      .then(() => {
        toast.success("Event Removed Successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsLoading(false);
        setTitle("");
        setStartDate("");
        setEndDate("");
        setIsEdditing(false);

        fetchEvents();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <section>
        {/* create events */}
        <Modal
          open={open}
          onClose={setOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div
              className="ml-auto p-2 text-black semifont-bold hover:bg-red-300 ease-in duration-300 rounded-md cursor-pointer mb-5 flex justify-center items-center"
              onClick={() => setOpen(false)}
            >
              close
            </div>

            <form
              onSubmit={SubmitEvent}
              action=""
              className="flex justify-between flex-col  h-[80%]"
            >
              {/* event tittle */}
              <div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="name"
                  >
                    Event Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    className="form-input w-full"
                    type="text"
                    onChange={(e) => {
                      setError("");
                      setTitle(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-5 w-full flex gap-3">
                  {/* start */}
                  <div>
                    <small>Start Date</small>
                    <DatePicker date={startDate} setDate={setStartDate} />
                  </div>
                  {/* end */}
                  <div>
                    <small>End Date</small>
                    <DatePicker date={endDate} setDate={setEndDate} />
                  </div>
                </div>
              </div>
              {error && <p className="text-red-500">📅 {error}</p>}
              <div className="flex align-bottom items-center justify-center mt-6">
                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
                  type="submit"
                >
                  {isLoading ? (
                    <CompLoader height={"20px"} color="#ffffff" />
                  ) : (
                    "Create Event "
                  )}
                </button>
              </div>
            </form>
          </Box>
        </Modal>
        {/* update events */}
        <Modal
          open={isEdditing}
          onClose={setIsEdditing}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div
              className="ml-auto p-2 text-black semifont-bold hover:bg-red-300 ease-in duration-300 rounded-md cursor-pointer mb-5 flex justify-center items-center"
              onClick={() => {
                setStartDate("");
                setEndDate("");
                setIsEdditing(false);
              }}
            >
              close
            </div>

            <form
              onSubmit={UpdateEvent}
              action=""
              className="flex justify-between flex-col  h-[80%]"
            >
              {/* event tittle */}
              <div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="name"
                  >
                    Event Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    className="form-input w-full"
                    type="text"
                    defaultValue={singleEvent.title}
                    onChange={(e) => {
                      setError("");
                      setTitle(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-5 w-full flex gap-3">
                  {/* start */}
                  <div>
                    <small>Start Date</small>
                    <DatePicker date={startDate} setDate={setStartDate} />
                  </div>
                  {/* end */}
                  <div>
                    <small>End Date</small>
                    <DatePicker date={endDate} setDate={setEndDate} />
                  </div>
                </div>
              </div>
              {error && <p className="text-red-500">📅 {error}</p>}
              <div className="flex align-bottom items-center justify-center mt-6">
                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
                  type="submit"
                >
                  {isLoading ? (
                    <CompLoader height={"20px"} color="#ffffff" />
                  ) : (
                    "Update Event "
                  )}
                </button>
                <button
                  className="btn hover:bg-red-200  text-red-500 ml-3"
                  type="button"
                  onClick={deleteEvent}
                >
                  {isLoading ? (
                    <CompLoader height={"20px"} color="#ffffff" />
                  ) : (
                    "Remove Event "
                  )}
                </button>
              </div>
            </form>
          </Box>
        </Modal>
      </section>
      <div className="flex justify-between items-center p-3">
        <h1 className="text-xl font-bold">Event Calender</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-500 p-2 rounded-md text-white "
        >
          Create Events
        </button>
      </div>
      <section className="p-3">
        <Fullcalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={{
            start: "today prev,next", // will normally be on the left. if RTL, will be on the right
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
          }}
          height={"90vh"}
          dateClick={handleDateClick}
          events={events}
          eventClick={handleEventClick}
        />
      </section>
    </div>
  );
}

export default Calendar;
