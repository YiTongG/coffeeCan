import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [weightUnit, setWeightUnit] = useState("oz"); //  oz

  const navigate = useNavigate();

  const getCoordinates = async (address) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          address
        )}&key=128f616559a142cb93e1fb1ed723cb80`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        return { latitude: lat, longitude: lng };
      } else {
        throw new Error("Unable to find coordinates for the given address.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const { latitude, longitude } = await getCoordinates(inputs.address);

      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseFloat(inputs.price),
          weight: parseInt(inputs.weight),
          address: inputs.address,
          city: inputs.city,
          latitude: latitude.toString(),
          longitude: longitude.toString(),
          from: inputs.from,
          type: inputs.type,
          roasting: inputs.roasting,
          images: images,
        },
        postDetail: {
          desc: value,
          unitPrice: parseFloat(unitPrice),
        },
      });
      navigate("/" + res.data.id);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  const calculateUnitPrice = () => {
    let weightInOunces = weight;

    if (weightUnit === "kg") {
      // 
      weightInOunces = weight * 35.274;
    }

    if (weightInOunces > 0) { 
      setUnitPrice((price / weightInOunces).toFixed(2));
    } else {
      setUnitPrice(0);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Coffee Bean Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="price">Price (Total)</label>
              <input
                id="price"
                name="price"
                type="number"
                required
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  calculateUnitPrice();
                }}
              />
            </div>
            <div className="item">
              <label htmlFor="weight">Weight</label>
              <div className="weight-input">
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  required
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                    calculateUnitPrice();
                  }}
                />
                <select
                  name="weightUnit"
                  value={weightUnit}
                  onChange={(e) => {
                    setWeightUnit(e.target.value);
                    calculateUnitPrice();
                  }}
                >
                  <option value="oz">oz</option>
                  <option value="kg">kg</option>
                </select>
              </div>
            </div>
            <div className="item">
              <label htmlFor="unitPrice">Unit Price (per oz)</label>
              <input
                id="unitPrice"
                name="unitPrice"
                type="number"
                value={unitPrice}
                readOnly
              />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="from">Producer</label>
              <input id="from" name="from" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="roasting">Roasting Level</label>
              <select name="roasting" required>
                <option value="light">Light</option>
                <option value="cinnamon">Cinnamon</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="city">City</option>
                <option value="fullCity">Full City</option>
                <option value="french">French</option>
                <option value="italian">Italian</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type" required>
                <option value="localRoaster">Local Roaster</option>
                <option value="packagedBean">Packaged Bean</option>
              </select>
            </div>
            <button className="sendButton">Add</button>
            {error && <span>{error}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "dvqyaz1tc",
            uploadPreset: "coffee",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;
