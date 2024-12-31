import React from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { Card } from "react-bootstrap";

const ShareCollaboratePage = () => {
  const shareUrl = "https://example.com"; // Replace with your actual link
  const shareText = "Check out this amazing itinerary! Plan your next trip with ease.";

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Card style={{ width: "500px", padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <Card.Body>
          <h4 className="text-center mb-4">Share Your Itinerary</h4>
          <p className="text-center text-muted mb-4">
            Share your exciting itinerary with your friends and family on your favorite platforms!
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <WhatsappShareButton url={shareUrl} title={shareText}>
              <WhatsappIcon size={50} round={true} />
            </WhatsappShareButton>
            <FacebookShareButton url={shareUrl} quote={shareText}>
              <FacebookIcon size={50} round={true} />
            </FacebookShareButton>
            <EmailShareButton url={shareUrl} subject="Check out this itinerary!" body={shareText}>
              <EmailIcon size={50} round={true} />
            </EmailShareButton>
            <LinkedinShareButton url={shareUrl} title="Amazing Itinerary" summary={shareText} source={shareUrl}>
              <LinkedinIcon size={50} round={true} />
            </LinkedinShareButton>
            <TelegramShareButton url={shareUrl} title={shareText}>
              <TelegramIcon size={50} round={true} />
            </TelegramShareButton>
            <TwitterShareButton url={shareUrl} title={shareText}>
              <TwitterIcon size={50} round={true} />
            </TwitterShareButton>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ShareCollaboratePage;
