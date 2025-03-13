import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import successAnimation from "../Assets/success-animation.json"; // Ensure you have an animation file
import backgroundVideo from "../Assets/background-video.mp4";
import starsAnimation from "../Assets/stars-animation.json"; // Twinkling stars animation

const successOptions = {
  loop: true,
  autoplay: true,
  animationData: successAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const starsOptions = {
  loop: true,
  autoplay: true,
  animationData: starsAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: "-2",
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      {/* Twinkling Stars Animation */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: "-1",
        pointerEvents: "none",
      }}>
        <Lottie options={starsOptions} height="100%" width="100%" />
      </div>
      
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card style={{
          width: "450px",
          padding: "30px",
          textAlign: "center",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "20px",
        }}>
          <Card.Body>
            {/* Success Animation */}
            <Lottie options={successOptions} height={150} width={150} />
            <h3 className="text-success mb-4">Password Reset Successful!</h3>
            <p className="text-muted">Please check your email for further instructions.</p>
            <Button variant="primary" onClick={() => navigate("/")}>
              Go to Login
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ThankYou;
