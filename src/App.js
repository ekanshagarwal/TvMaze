import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./pages/root";
import ShowDetailsScreen from "./pages/detail";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
  },{
    path:'/show/:id',
    element:<ShowDetailsScreen/>
  }
]);



function App() {
  return <RouterProvider router={router} />;
}

export default App;
