import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import avatar from "../assets/images/avatar.jpg";
import { FaStar, FaMapPin } from "react-icons/fa";
import CalculateAvg from "../utils/CalculateAvg";
import Booking from "../components/Booking/Booking";
import { toast } from "react-toastify";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../utils/config";
import { AuthContext } from "../context/AuthContext";

const TourDetails = () => {
  const { user } = useContext(AuthContext);
  const reviewMsgRef = useRef();
  const [tourRating, setTourRating] = useState();
  const { id } = useParams();
  const [preferences, setPreferences] = useState({ budget: "", duration: "", activities: "" });
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { apiData: tour, error } = useFetch(`${BASE_URL}/tour/${id}`, { method: "GET" });
  const { title = "", photo = "", desc = "", price = "", reviews = "", address = "" } = tour || {};
  const reviewsArray = Array.isArray(reviews) ? reviews : [];
  const { avgRating } = CalculateAvg(reviewsArray);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    if (user) {
      const reviewData = { username: user.username, reviewText, rating: tourRating };
      try {
        const response = await fetch(`${BASE_URL}/review/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reviewData),
        });
        const result = await response.json();
        if (response.ok) {
          window.location.reload();
        } else {
          toast.error(result.message);
        }
      } catch (err) {
        toast.error("Server not responding");
        console.log(err);
      }
    } else {
      toast.error("Please Sign In first");
    }
  };

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: value }));
  };
const generateItinerary = () => {
  setLoading(true);
  const staticItinerary = `
    Day 1: Arrive in ${title}. Explore local cuisine.
    Day 2: Visit popular attractions including ${preferences.activities || "sightseeing spots"}.
    Day 3: Enjoy activities based on your preferences for ${preferences.duration} days.
    Budget: ${preferences.budget ? preferences.budget + ' USD' : 'Not specified'}
  `;
  setItinerary(staticItinerary);
  setLoading(false);
  toast.success("Itinerary generated successfully!");
};

return (
  <section className="my-4 px-12 w-full">
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-shrink-0">
        <div className="max-w-3xl max-h-[400px] rounded-md overflow-hidden">
          <img src={photo} alt={title} />
        </div>
        <div className="my-8 overflow-hidden border-2 shadow-sm border-gray-200 rounded-md space-y-4 px-2 py-2 md:px-8 md:py-8 mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center md:text-start text-BaseColor">{title}</h2>
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12">
            <div className="flex items-center gap-2">
              <FaStar />
              <span>{avgRating} ({reviewsArray.length})</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapPin />
              <span>{address}</span>
            </div>
          </div>
          <h3 className="text-xl text-center md:text-start md:text-2xl">Description</h3>
          <p className="mobpara md:para">{desc}</p>
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-start">Reviews ({reviewsArray.length} reviews)</h3>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-1 my-2">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`cursor-pointer ${tourRating === index + 1 ? "text-orange-800" : "text-orange-500 hover:text-orange-800"}`}
                  onClick={() => setTourRating(index + 1)}
                >
                  <FaStar />
                </span>
              ))}
            </div>
            <div className="flex my-8 gap-4 w-full border-BaseColor border-[1px] rounded-full">
              <input
                type="text"
                ref={reviewMsgRef}
                placeholder="Share your thoughts"
                className="focus:outline-none w-2/3 flex-1 py-2 px-4"
              />
              <button className="bg-BaseColor hover:bg-BHoverColor animate-fade-in duration-300 py-2 hover:px-6 px-4 my-1 mx-1 text-white rounded-full" type="submit">
                Submit
              </button>
            </div>
          </form>
          <div>
            {reviewsArray.map((review) => (
              <div className="py-3 px-4" key={review._id}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-black border-[1px] overflow-hidden">
                    <img src={avatar} alt="" />
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold">{review.username}</h5>
                    <p className="text-gray-700 text-sm">{new Date(review.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center py-3 px-12 justify-between">
                  <h5 className="text-lg">{review.reviewText}</h5>
                  <span className="flex items-center gap-1">{review.rating}<FaStar className="text-BaseColor" /></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full px-6 rounded-md flex-shrink">
        <Booking title={title} price={price} avgRating={avgRating} reviewsArray={reviewsArray} />
      </div>
    </div>

    <div className="my-8">
      <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center md:text-start text-BaseColor">Plan Your Custom Itinerary</h2>
      <div className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          name="budget"
          value={preferences.budget}
          onChange={handlePreferenceChange}
          placeholder="Enter Budget"
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          name="duration"
          value={preferences.duration}
          onChange={handlePreferenceChange}
          placeholder="Enter Duration (days)"
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          name="activities"
          value={preferences.activities}
          onChange={handlePreferenceChange}
          placeholder="Preferred Activities (e.g., hiking, museums)"
          className="p-2 border rounded-md"
        />
      </div>

      <button
        className="bg-BaseColor text-white py-2 px-6 rounded-md hover:bg-BHoverColor"
        onClick={generateItinerary}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Itinerary"}
      </button>

      {itinerary && (
        <div className="mt-8 p-4 border border-gray-200 rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold">Your Custom Itinerary:</h3>
          <div className="roadmap-container">
            {itinerary.split('\n').map((item, index) => (
              <div>
              <div className="roadmap-item" key={index}>
                <div className="roadmap-dot"></div>
                <div className="roadmap-content">{item}</div>
              </div>
              <img src="https://png.pngtree.com/png-vector/20191126/ourmid/pngtree-image-of-cute-radish-vector-or-color-illustration-png-image_2040180.jpg" alt="" />
              </div>
              
            ))}
          </div>
        </div>
      )}
    </div>
  </section>
);
};

// CSS for the roadmap
const styles = `
.roadmap-container {
  position: relative;
  padding-left: 20px;
}
.roadmap-item {
  position: relative;
  margin-bottom: 20px;
}
.roadmap-dot {
  position: absolute;
  left: 0;
  top: 10px;
  width: 10px;
  height: 10px;
  background: #4A90E2;
  border-radius: 50%;
}
.roadmap-content {
  padding-left: 30px;
  border-left: 2px dashed #ccc;
}
`;

export default TourDetails;
