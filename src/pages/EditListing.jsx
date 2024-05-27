import "../styles/CreateListing.scss";
import Navbar from "../components/Navbar";
import { categories, facilities } from "../data";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { useState, useEffect } from "react";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer"

const EditListing = () => {
  const [category, setCategory] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    city: "",
    province: "",
    country: "",
  });


  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };

  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  const [amenities, setAmenities] = useState([]);

  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((option) => option !== facility)
      );
    } else {
      setAmenities((prev) => [...prev, facility]);
    }
  };

  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0,
  });

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };

  const creatorId = useSelector((state) => state.user._id);
  const { listingId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`https://rentify-backend-git-main-aravindhs-projects-8b4b22dd.vercel.app/properties/${listingId}`);
        const data = await response.json();
  
        setCategory(data.category || "");
        setFormLocation({
          streetAddress: data.streetAddress || "",
          city: data.city || "",
          province: data.province || "",
          country: data.country || "",
        });
        setGuestCount(data.guestCount || 1);
        setBedroomCount(data.bedroomCount || 1);
        setBedCount(data.bedCount || 1);
        setBathroomCount(data.bathroomCount || 1);
        setAmenities(data.amenities || []); // Ensure amenities array is set
        setPhotos(
          data.listingPhotos
            ? data.listingPhotos.map(photo => ({
                src: URL.createObjectURL(photo),
                alt: "Listing Photo"
              }))
            : []
        ); // Ensure correct mapping for photos
        setFormDescription({
          title: data.title || "",
          description: data.description || "",
          highlight: data.highlight || "",
          highlightDesc: data.highlightDesc || "",
          price: data.price || 0,
        });
      } catch (err) {
        console.log("Fetch Listing failed", err.message);
      }
    };
  
    fetchListing();
  }, [listingId]);
  
  
  const handleUpdate = async (e) => {
    e.preventDefault();
  
    try {
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("category", category);
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("city", formLocation.city);
      listingForm.append("province", formLocation.province);
      listingForm.append("country", formLocation.country);
      listingForm.append("guestCount", guestCount);
      listingForm.append("bedroomCount", bedroomCount);
      listingForm.append("bedCount", bedCount);
      listingForm.append("bathroomCount", bathroomCount);
      // Convert amenities array to string before appending
      listingForm.append("amenities", amenities);
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);
      listingForm.append("highlight", formDescription.highlight);
      listingForm.append("highlightDesc", formDescription.highlightDesc);
      listingForm.append("price", formDescription.price);
  
      // Append each photo individually
      photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo);
      });
  
      const response = await fetch(`https://rentify-backend-git-main-aravindhs-projects-8b4b22dd.vercel.app/${listingId}/edit`, {
        method: "PUT",
        body: listingForm,
      });
  
      if (response.ok) {
        navigate(`/properties/${listingId}`);
      } else {
        console.log("Update Listing failed", response.statusText);
      }
    } catch (err) {
      console.log("Update Listing failed", err.message);
    }
  };

  const handleDeleteListing = async () => {
    try {
      const response = await fetch(`https://rentify-backend-git-main-aravindhs-projects-8b4b22dd.vercel.app/properties/${listingId}/delete`, {
        method: 'DELETE',
      });

      if (response.ok) {
        navigate('/');
      } else {
        console.error('Failed to delete listing');
      }
    } catch (error) {
      console.error('Failed to delete listing:', error.message);
    }
  };

  const handleConfirmDelete = (e) => {
    e.preventDefault();
    setShowConfirmDialog(true);
  };
  

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  const handleConfirmDeleteListing = () => {
    handleDeleteListing();
  };

  

  return (
    <>
      <Navbar />

      <div className="create-listing">
      <h1 style={{textAlign:"center"}}>Rent your Place here </h1>
        <form onSubmit={handleUpdate}>
          <div className="create-listing_step1">
          <h2>Enter the location</h2>
            <h3>Select if your place comes under any Famous Destination</h3>
            <div className="category-list">
              {categories?.map((item, index) => (
                <div
                  className={`category ${
                    category === item.label ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => setCategory(item.label)}
                >
                  <div className="category_icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

            <h3>Enter the detailed Address in the below Columns</h3>
            <div className="half">
              <div className="location">
                <p>Door No / Apartment No</p>
                <input
                  type="text"
                  placeholder="Door No / Apartment No"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>Street</p>
                <input
                  type="text"
                  placeholder="Street"
                  name="city"
                  value={formLocation.city}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>
<br />
            <div className="half">
              <div className="location">
                <p>City</p>
                <input
                  type="text"
                  placeholder="City"
                  name="province"
                  value={formLocation.province}
                  onChange={handleChangeLocation}
                  required
                />
              </div>

              <div className="location">
                <p>Country</p>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={formLocation.country}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>
            </div>
            <div className="create-listing_step2">

            <h2>Share the essential property information </h2>
              <hr />
              <h3>Basic Details</h3>
            <div className="basics">
              <div className="basic">
                <p>Peoples</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      guestCount > 1 && setGuestCount(guestCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{guestCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setGuestCount(guestCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Bedrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{bedroomCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBedroomCount(bedroomCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Beds</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bedCount > 1 && setBedCount(bedCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{bedCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBedCount(bedCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Bathrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{bathroomCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBathroomCount(bathroomCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>
            </div>

            <h3>Tell guests what your place has to offer</h3>
            <div className="amenities">
              {facilities?.map((item, index) => (
                <div
                  className={`facility ${
                    amenities.includes(item.name) ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => handleSelectAmenities(item.name)}
                >
                  <div className="facility_icon">{item.icon}</div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
            </div>    

            <div className="create-listing_step3">           
              <h2>Upload Images to attract more clients </h2>
              <hr />
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="alone">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}

                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => {
                          return (
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="photo"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <img
                                    src={URL.createObjectURL(photo)}
                                    alt="place"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePhoto(index)}
                                  >
                                    <BiTrash />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="together">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            </div>
          
          <div className="create-listing_step4">

            <h2>Enter content to display to user in the List </h2>
            <hr />

            <h3>Write the content below</h3>
            <div className="description">
              <p>Title</p>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={formDescription.title}
                onChange={handleChangeDescription}
                required
              />
              <p>Description</p>
              <textarea
                type="text"
                placeholder="Description"
                name="description"
                value={formDescription.description}
                onChange={handleChangeDescription}
                required
              />
              <p>Highlight</p>
              <input
                type="text"
                placeholder="Highlight"
                name="highlight"
                value={formDescription.highlight}
                onChange={handleChangeDescription}
                required
              />
              <p>Contact No</p>
              <input
                type="number"
                placeholder="Contact No"
                name="highlightDesc"
                value={formDescription.highlightDesc}
                onChange={handleChangeDescription}
                required
              />
              <p>Now, set your PRICE</p>
              <span>₹</span>
              <input
                type="number"
                placeholder="100"
                name="price"
                value={formDescription.price}
                onChange={handleChangeDescription}
                className="price"
                required
              />
            </div>
          </div>
          <div className="button-container">

            <button className="submit_btn" type="submit">UPDATE YOUR LISTING</button><br />
            <button className="submit_btn-2" onClick={handleConfirmDelete}>Delete Listing</button>
            </div>

          {showConfirmDialog && (
            <div className="confirmation-dialog">
                <p>Are you sure you want to delete this listing?</p>
                <button onClick={handleConfirmDeleteListing}>Yes</button>
                <button onClick={handleCancelDelete}>No</button>
            </div>
        )}
        </form>
      </div>

      <Footer />
    </>
  );
};

export default EditListing;
