import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { ArrowBack } from "@mui/icons-material";
import Card from "../../assets/images/about/card.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShareModal from "./ShareModal";
import "./Dashboard.css";

const Dashboard = () => {
  const [itineraries, setItineraries] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredItineraries, setFilteredItineraries] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItineraryId, setSelectedItineraryId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const randomImages = [
    "https://images.unsplash.com/photo-1506748686213-e58b2b6a8339",
    "https://images.unsplash.com/photo-1531864623371-91fd7426f6a6",
    "https://images.unsplash.com/photo-1535613183-47f90729b979",
    "https://images.unsplash.com/photo-1515129988164-9e6a4b694100",
  ];

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("User is not authenticated. Please login.");
          return;
        }
        const response = await axios.get(
          "https://plangobackend.onrender.com/api/itinerary",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setItineraries(response.data);
        setFilteredItineraries(response.data);
      } catch (error) {
        console.error("Error fetching itineraries:", error);
      }
    };
    fetchItineraries();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    filterItineraries(e.target.value);
  };

  const filterItineraries = (query) => {
    if (!query) {
      setFilteredItineraries(itineraries);
    } else {
      const filtered = itineraries.filter(
        (itinerary) =>
          itinerary.startPlace.toLowerCase().includes(query.toLowerCase()) ||
          itinerary.endPlace.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItineraries(filtered);
    }
  };

  const handleViewItinerary = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `https://plangobackend.onrender.com/api/itinerary/${id}/download`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `itinerary_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Itinerary downloaded successfully!");
    } catch (error) {
      console.error("Error downloading itinerary:", error);
      toast.error("Failed to download itinerary. Please try again.");
    }
  };

  const handleShareItinerary = (id) => {
    setSelectedItineraryId(id);
    setModalOpen(true);
  };

  const handleShareSubmit = async (email) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `https://plangobackend.onrender.com/api/itinerary/${selectedItineraryId}/share`,
        { recipientEmail: email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Itinerary shared successfully!");
      setModalOpen(false);
    } catch (error) {
      console.error("Error sharing itinerary:", error);
      toast.error(
        error.response?.data?.msg ||
          "Failed to share itinerary. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className="dashboard-container">
      <button className="back-button" onClick={handleBackButtonClick}>
        <ArrowBack style={{ marginRight: "10px" }} />
        Back
      </button>
      <div className="content">
        <h1 className="dashboard-title">My Itineraries</h1>
        <div className="search-bar">
          <input
            className="search-input"
            placeholder="Search Itinerary"
            value={search}
            onChange={handleSearchChange}
          />
          <FaSearch className="search-icon" />
        </div>
        <div className="itinerary-cards">
          {filteredItineraries.map((itinerary) => (
            <div className="itinerary-card" key={itinerary._id}>
              <img className="card-image" src={Card}></img>
              <div className="card-content">
                <div className="itinerary-title">
                  {itinerary.startPlace} to {itinerary.endPlace}
                </div>
                <div className="card-actions">
                  <button
                    className="view-button"
                    onClick={() => handleViewItinerary(itinerary._id)}
                  >
                    Download Itinerary
                  </button>
                  <button
                    className="share-button"
                    onClick={() => handleShareItinerary(itinerary._id)}
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ShareModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleShareSubmit}
        isLoading={isLoading}
        itineraryId={selectedItineraryId}
      />
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
