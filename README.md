# Task Manager by Pancratzia

This project is a simple Task Manager application built using React. It allows users to create, edit, and delete tasks, as well as filter tasks based on their status (completed or pending) and priority (high, medium, low).

### Project Structure

The project is organized into the following components:

- **App Component**
  - Entry point of the application.
  - Uses React Router for navigation.
  - Defines routes for the layout, task list, task creation, and task editing.

```jsx
// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import List from "./components/List";
import Form from "./components/Form";

function App() {
  // ... (Layout and Route definitions)
}

export default App;
```

- **Filters Component**
  - Displays filters for status (completed/pending) and priority (high/medium/low) in the task list.
  - Allows users to filter tasks based on these criteria.

```jsx
// src/components/Filters.js
import React from "react";
// ... (Filters Component)
export default Filters;
```

- **Form Component**
  - Handles task creation and editing.
  - Validates task details before saving.
  - Displays a form for users to input task details.

```jsx
// src/components/Form.js
import React, { useState, useEffect } from "react";
// ... (Form Component)
export default Form;
```

- **List Component**
  - Displays the list of tasks.
  - Supports pagination.
  - Allows users to create, edit, and delete tasks.
  - Provides filtering options based on status and priority.

```jsx
// src/components/List.js
import React, { useState, useEffect } from "react";
// ... (List Component)
export default List;
```

- **Task Component**
  - Represents an individual task in the task list.
  - Displays task details, including name, status, priority, and due date.
  - Allows users to mark tasks as completed, edit tasks, and delete tasks.

```jsx
// src/components/Task.js
import React from "react";
// ... (Task Component)
export default Task;
```

### Project Setup

To set up and run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```

2. Install dependencies:

   ```bash
   cd <project_directory>
   pnpm install
   ```

3. Run the development server:

   ```bash
   pnpm start
   ```

   or

   ```bash
   pnpm run dev
   ```

5. Open the application in your web browser at [http://localhost:5173/](http://localhost:5173/).

### Project Functionality

The application allows users to:

- View a list of tasks with details such as name, status, priority, and due date.
- Mark tasks as completed or pending.
- Edit existing tasks.
- Create new tasks.
- Delete tasks.
- Filter tasks based on status (completed/pending) and priority (high/medium/low).
- Navigate between pages using pagination.

### Screenshots/GIFs

![image](https://github.com/Pancratzia/Task-Manager-App/assets/54899954/fac41082-d3f0-4a55-a437-dd6fb4e56444)

![image](https://github.com/Pancratzia/Task-Manager-App/assets/54899954/b39f0540-ee50-4af1-ade6-805524df8ef6)

![image](https://github.com/Pancratzia/Task-Manager-App/assets/54899954/ce975edd-c5b7-471e-9483-f68653bc9dd0)

![image](https://github.com/Pancratzia/Task-Manager-App/assets/54899954/1edba5e7-5ada-45db-a0b6-f35f0ae5af4b)

![image](https://github.com/Pancratzia/Task-Manager-App/assets/54899954/5fe5cf10-ceae-4973-9a21-455df3e4b287)
