import { useRoutes } from 'react-router';
import './App.css';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Projects } from './pages/Projects/Projects';
// import { Teams } from './pages/Teams/Teams';
// import { Analytics } from './pages/Analytics/Analytics';
// import { Messages } from './pages/Messages/Messages';
// import { Integrations } from './pages/Integrations/Integrations';

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "projects", 
          element: <Projects />,
        },
        // {
        //   path: "teams", 
        //   element: <Teams />,
        // },
        // {
        //   path: "analytics", 
        //   element: <Analytics />,
        // },
        // {
        //   path: "messages", 
        //   element: <Messages />,
        // },
        // {
        //   path: "integrations", 
        //   element: <Integrations />,
        // },
      ],
    },
  ]);

  return element;
}

export default App;
