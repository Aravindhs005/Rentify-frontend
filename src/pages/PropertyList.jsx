import "../styles/List.scss";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer"

const PropertyList = () => {
  const [loading, setLoading] = useState(true)
  const user = useSelector((state) => state.user)
  const propertyList = user?.propertyList;
  console.log(user)

  const dispatch = useDispatch()
  const getPropertyList = async () => {
    try {
      const response = await fetch(`https://rentify-backend-git-main-aravindhs-projects-8b4b22dd.vercel.app/users/${user._id}/properties`, {
        method: "GET"
      })
      const data = await response.json()
      console.log(data)
      dispatch(setPropertyList(data))
      setLoading(false)
    } catch (err) {
      console.log("Fetch all properties failed", err.message)
    }
  }

  useEffect(() => {
    getPropertyList()
  }, [])

  return loading ? <Loader /> : (
    <>
      <Navbar />
      <h1 className="title-list" style={{textAlign:"center"}}>Your Property List</h1>
      <div className="list">
        {propertyList && propertyList.length > 0 ? (
propertyList?.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            city,
            province,
            country,
            category,
            price,
          }) => (
            <ListingCard
              listingId={_id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              province={province}
              country={country}
              category={category}
              price={price}
            />
          )
        )) : (
          <p className="no-content-message">No content in your propertyList</p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default PropertyList;
