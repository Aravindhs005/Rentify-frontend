import "../styles/Slide.scss";
import slideImage from "./slide.png"; // Adjust the path as necessary


const Slide = () => {
  return (
    <div className="slide">
            <div className="slidingcontainer">
                    <div className="sliding-text">RENTIFY ! Your Trusted Rental Service . </div>
            </div>

      <div className="content">
        <h1 style={{paddingLeft:"30px"}}>
          Your Trusted <span style={{color:"thistle"}}>HOME RENTAL</span> Website  <br /> 
          Looking for a place to <span style={{color:"tomato"}}>STAY</span> ? <br />
          Rent and <span style={{color:"teal"}}>LIVE</span> here !!
        </h1>
      </div>
      <div className="image">
        <img src={slideImage} alt="Description of image" />
      </div>
    </div>
  );
};

export default Slide;
