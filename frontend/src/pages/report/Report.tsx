import { TaskReport } from "./tasks/TaskReport";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { InventoryReport } from "./inventory/InventoryReport";

export const Report = () => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(
    dayjs(new Date(2025, 0, 10))
  );

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Select Date"
          value={selectedDate}
          onChange={(newValue) => {
            if (newValue) {
              setSelectedDate(newValue);
            }
          }}
        />
      </LocalizationProvider>
      <TaskReport time={selectedDate.toDate()} />
      <InventoryReport time={selectedDate.toDate()} />
    </div>
  );
};
