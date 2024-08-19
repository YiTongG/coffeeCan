import "./profilePage.scss";
import { Link, useNavigate, useLoaderData } from "react-router-dom";
import { useContext, Suspense } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Await } from "react-router-dom";
import apiRequest from "../../lib/apiRequest"; // 确保引入 apiRequest
import List from "../../components/list/List";

function ProfilePage() {
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const data = useLoaderData(); // 获取 loader 中的数据

  const storedUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      localStorage.removeItem("currentUser");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  if (!storedUser) {
    return <p>No user data found. Please log in.</p>;
  }

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={storedUser.avatar || "noavatar.jpg"} alt="User Avatar" />
            </span>
            <span>
              Username: <b>{storedUser.username}</b>
            </span>
            <span>
              E-mail: <b>{storedUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>

          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>

          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>

          <div className="title">
            <h1>Saved List</h1>
          </div>

          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
