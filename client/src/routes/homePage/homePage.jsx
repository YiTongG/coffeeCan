import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";

function HomePage() {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Discover & Review Your Favorite Coffee Beans</h1>
          <p>
          Explore the best local roasters and packaged beans. Share your experiences
  and find your next favorite coffee.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>500+</h1>
              <h2>Local Roasters</h2>
            </div>
            <div className="box">
              <h1>1000+</h1>
              <h2>Packaged Beans</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>User Reviews</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
