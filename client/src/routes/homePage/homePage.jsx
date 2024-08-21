import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";

function HomePage() {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Discover & Enjoy the Best Coffee Beans</h1>
          <p>
            Explore a curated selection of local roasters and premium packaged beans. Share your experiences, connect with fellow coffee enthusiasts, and find your next favorite brew.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h2>Explore Local Roasters</h2>
              <p>Find unique and freshly roasted coffee beans from top local artisans.</p>
            </div>
            <div className="box">
              <h2>Discover Packaged Beans</h2>
              <p>Browse a wide variety of selected packaged beans.</p>
            </div>
            <div className="box">
              <h2>Read and Share Reviews</h2>
              <p>Join the community near you with other coffee lovers.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
      <img src="/back.png" alt="Background" />

      </div>
    </div>
  );
}

export default HomePage;
