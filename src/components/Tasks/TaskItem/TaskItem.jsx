// * - IMPORTING -
// React
import React, { useState } from "react";
// Redux
import { useSelector } from "react-redux";
// MUI
import { Box, ThemeProvider } from "@mui/material";
// CSS
import "../../App/App.css";
// Components
import DeleteTaskButton from "./DeleteTask/DeleteTaskButton";
import TaskDeadline from "./TaskDeadline/TaskDeadline";
import TaskComplete from "./TaskComplete/TaskComplete";
import TaskDetailsModal from "./TaskDetailsModal/TaskDetailsModal";
import TaskDueDate from "./TaskDeadline/TaskDueDate/TaskDueDate";
import taskItemTheme from "./taskItemTheme";

// * - TaskItem COMPONENT -
function TaskItem({ priorityID, taskNumber, task }) {
  // * - DECLARATIONS -
  // Declaring user from store
  const user = useSelector((store) => store.user);
  // Declaring userID from store
  const userID = user.id;

  // * - STATE -
  // - NEW TASK FORM -
  // Local state for newTask
  const [taskInput, setTaskInput] = useState("");
  // Local state for showing text prompt
  const [taskInputPrompt, setTaskInputPrompt] = useState(false);

  // - PAST DUE -
  // Get the current date
  const currentDate = new Date();
  // Check if the task's deadline exceeds the current date
  const isPastDue = task.deadline && new Date(task.deadline) < currentDate;

  // - TaskDetailsModal -
const [openTaskDetailsModal, setOpenTaskDetailsModal] = useState(false);
// Functions to handle open and close
// Open
const handleOpenTaskDetailsModal = () => {
  setOpenTaskDetailsModal(true);
};
// Close
const handleCloseTaskDetailsModal = () => {
  setOpenTaskDetailsModal(false);
};


  // * - RENDERING -
  return (
    // * Task Item Card
    <Box sx={taskItemTheme.overrides.MuiBox.root}>
      {/* - HEADER OF TaskItem CARD -  */}
      {/* Task number, event buttons, and due date */}
      <header>
        <center>
          <h3
            style={{
              margin: "3px auto 3px",
              cursor: "pointer",
            }}
          >
            {`Task ${taskNumber}`}
          </h3>
        </center>

        {/* Task Event Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "3px auto",
          }}
        >
          {/* Task Complete Button */}
          <TaskComplete
            priorityID={priorityID}
            taskNumber={taskNumber}
            taskCompletion={task.is_completed}
          />
          {/* Set Task Deadline Button */}
          <TaskDeadline priorityID={priorityID} taskNumber={taskNumber} />
          {/* Task Delete Button */}
          <DeleteTaskButton priorityID={priorityID} taskNumber={taskNumber} />
        </div>

        {/* Task Due Date Component to show due date */}
        <TaskDueDate
          isPastDue={isPastDue}
          taskDueDate={task.due_date_formatted}
        />
      </header>
      {/* - END HEADER OF TaskItem CARD - */}

      {/* - MAIN OF TaskItem CARD-  */}
      {/* Modal of Task */}
      <main>
        {/* Modal of Task Details */}
        <TaskDetailsModal
          open={openTaskDetailsModal} // Pass the open state to the modal
          handleClose={handleCloseTaskDetailsModal} // Pass the close function to the modal
          taskTitle={task.task_title} // Pass the task title to the modal
        />
      </main>
      {/* - END MAIN OF TaskItem CARD - */}
    </Box>
    // * End Task Item Card
  );
}

export default TaskItem;
