import { Link } from "react-router-dom";

const Layout = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/addQuestion">Add Question</Link>
        </li>
        <li>
          <Link to="">Create Sections</Link>
        </li>
        <li>
          <Link to="/createTestFormation">Create Test</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Layout;
