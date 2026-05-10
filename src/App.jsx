import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import LayoutAdmin from './pages/Layout/LayoutAdmin'
import Login from './pages/Login/Login'
import LayoutStudent from './pages/Layout/LayoutStudent'
import DashboardAdmin from './pages/Dashboard/DashboardAdmin'
import DashboardStudent from './pages/Dashboard/DashboardStudent'
import ShopAdmin from './pages/Shop/ShopAdmin'
import ShopStudent from './pages/Shop/ShopStudent'
import ClassAdmin from './pages/Classes/ClassAdmin'
import ClassStudent from './pages/Classes/ClassStudent'
import FoodStudent from './pages/Food/FoodStudent'
import FoodAdmin from './pages/Food/FoodAdmin'
import Teacher from './components/Teacher/Teacher'
import Student from './components/Student/Student'
import StudentLogin from './components/StudentLogin/StudentLogin'
import AdminLogin from './components/AdminLogin/AdminLogin'
import PaymentsStudent from './pages/Payments/PaymentsStudent'
import PaymentsAdmin from './pages/Payments/PaymentsAdmin'
import Profile from './pages/Profile/Profile'
import InfoStudent from './pages/Info/InfoStudent'
import GroupDetail from './components/GroupDetail/GroupDetail'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={"/login"}/>
    },
    {
      path: "/login",
      element: <Login/>,
      children: [
        {
          index: true,
          element: <Navigate to={"student"}/>
        },
        {
          path: "student",
          element: <StudentLogin/>
        },
        {
          path: "admin",
          element: <AdminLogin/>
        }
      ]
    },
    {
      path: "/layoutAdmin",
      element: <LayoutAdmin/>,
      children: [
        {
          index: true,
          element: <Navigate to={"dashboard"}/>
        },
        {
          path: "dashboard",
          element: <DashboardAdmin/>,
          children: [
            {
              index: true,
              element: <Navigate to={"teacher"}/>
            },
            {
              path: "teacher",
              element: <Teacher/>
            },
            {
              path: "student",
              element: <Student/>
            }
          ]
        },
        {
          path: "shop",
          element: <ShopAdmin/>
        },
        {
          path: "class",
          element: <ClassAdmin/>,
        }, 
        {
          path: "class/:groupName",
          element: <GroupDetail/>
        },
        {
          path: "food",
          element: <FoodAdmin/>
        },
        {
          path: "payment",
          element: <PaymentsAdmin/>
        }
      ]
    },
    {
      path: "/layoutStudent",
      element: <LayoutStudent/>,
      children: [
        {
          index: true,
          element: <Navigate to={"dashboard"}/>
        },
        {
          path: "dashboard",
          element: <DashboardStudent/>
        },
        {
          path: "shop",
          element: <ShopStudent/>
        },
        {
          path: "class",
          element: <ClassStudent/>
        }, 
        {
          path: "food",
          element: <FoodStudent/>
        },
        {
          path: "payments",
          element: <PaymentsStudent/>
        },
        {
          path: "profile",
          element: <Profile/>
        },
        {
          path: "information",
          element: <InfoStudent/>
        }
      ]
    }
  ])
  return (<>
   <RouterProvider router={router}/>
  </>)
}

export default App
