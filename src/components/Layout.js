import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (<>
    <h1>Address Book</h1>
    <br/>
    <nav>
      <Link to="/home">Home</Link>
      &nbsp;|&nbsp;
      <Link to="/list">Addressess</Link>
      &nbsp;|&nbsp;
      <Link to="/add">New</Link>
    </nav>
    <br/>
    <Outlet />
  </>);
}
