import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import Profile from "./pages/Profile"
import SignUp from "./pages/SignUp"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"
import CreatingListing from "./pages/CreatingListing"

export default function App() {
  return (
  
  <BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element = {<Home/>} />
    <Route path="/about" element = {<About/>} />
    <Route path="/sign-in" element = {<SignIn/>} />
    <Route path="/sign-up" element = {<SignUp/>} />
    <Route  element = {<PrivateRoute/>}>
    <Route path="/profile" element = {<Profile/>} />
    <Route path="/create-listing" element = {<CreatingListing/>} />

    </Route>
  </Routes>
  </BrowserRouter>
  )
  
}
