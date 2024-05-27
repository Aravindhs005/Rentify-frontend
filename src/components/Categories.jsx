import { categories } from "../data";
import "../styles/Categories.scss";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="categories">
      <h1>Explore Top Places</h1>
      <p style={{color:"coral"}}>
          Search and Explore wide Top Places. Click the Images below and look for your place to rent!
      </p>

      <div className="categories_list">
        {categories?.slice(1, 9).map((category, index) => (
          <Link to={`/properties/category/${category.label}`} key={index}>
            <div className="category">
              <img src={category.img} alt={category.label} />
              <div className="overlay"></div>
              <div className="category_text">
                <p>{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
