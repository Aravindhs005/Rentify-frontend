import { useEffect, useState } from "react";
import "../styles/ListingDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import emailjs from '@emailjs/browser';

import {
  FaShower,FaBed,FaDoorClosed
} from "react-icons/fa";

import { MdPeople } from "react-icons/md";


const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);

  const { listingId } = useParams();
  const [listing, setListing] = useState(null);

  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `https://rentify-backend-git-main-aravindhs-projects-8b4b22dd.vercel.app/properties/${listingId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  console.log(listing)


  const navigate = useNavigate()
  const customerId = useSelector((state) => state?.user?._id);

  const revealContent = async () => {
    const hiddenContent = document.getElementById("hiddencontent");
    if (hiddenContent) {
      hiddenContent.style.display = "block";
    }
    console.log(user.email);
    send(user.email);
    sendToCreator(listing.creator.email);
  };
  
  const send = (userEmail) => {
    console.log("User email:", userEmail);
    console.log("Listing creator email:", listing.creator.email);
    
    var templateParams = {
      message: `The Contact no of the Your Selected Place is ${listing.highlightDesc}`,
    };
  
    emailjs.send(
      'service_0nf66oa',
      'template_pad6bgr',
      templateParams,
      'dF2O5K-F4KISOReqL'
    )
      .then((response) => {
        console.log('Email sent successfully:', response);
        // Add any success message handling here
      })
      .catch((error) => {
        console.error('Email send failed:', error);
        // Add any error message handling here
      });
  };
  
  const sendToCreator = (creatorEmail) => {
    var templateParams = {
      message: `One user have seen your contact no in RENTIFY , His email is ${creatorEmail}`,
    }; 
    emailjs.send(
      'service_0nf66oa',
      'template_pad6bgr',
      templateParams,
      'dF2O5K-F4KISOReqL'
    )
      .then((response) => {
        console.log('Email sent successfully:', response);
        // Add any success message handling here
      })
      .catch((error) => {
        console.error('Email send failed:', error);
        // Add any error message handling here
      });
  };
  
  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      
      <div className="listing-details">
        <div className="title">
          <h1>{listing.title}</h1>
          <div><IconButton
          onClick={() => {
            navigate(`/`);
          }}
        >
          <Close/>
        </IconButton></div>
        </div>

        <div className="photos">
          {listing.listingPhotoPaths?.map((item) => (
            <img
              src={`https://rentify-backend-git-main-aravindhs-projects-8b4b22dd.vercel.app/${item.replace("public", "")}`}
              alt="listing photo"
            />
          ))}
        </div>

        <h2 >
          Located in {listing.city}, {listing.province},{" "}
          {listing.country}
        </h2>
        <p style={{ fontSize: "30px", color: "teal", alignItems: "center" }}>
  <span>{listing.guestCount}</span> <MdPeople /> <br/><span>{listing.bedroomCount}</span> <FaDoorClosed /> <br/> {" "}
  <span>{listing.bedCount}</span> <FaBed /> <br/> <span>{listing.bathroomCount}</span> <FaShower />
</p>

        <hr />

        <div className="profile">
          <h3>
            Hosted by {listing.creator.firstName} {listing.creator.lastName}
          </h3>
        </div>
        <hr />

        <h3>Description</h3>
        <p>{listing.description}</p>
        <hr />
        <h3>Content</h3>

        <p>{listing.highlight}</p>
        

        <hr />

        <div className="booking">
          <div>
            <h2>Amenties</h2>
            <div className="amenities">
              {listing.amenities[0].split(",").map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2>Want to contact the user?</h2>
            <div className="date-range-calendar">
            <h2 id="hiddencontent" style={{ display: "none",marginLeft:"40px" }}>
          {listing.highlightDesc}
        </h2>
        <button className="button" type="submit" style={{backgroundColor:"teal"}} onClick={revealContent}>
                Reveal Number
        </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ListingDetails;
