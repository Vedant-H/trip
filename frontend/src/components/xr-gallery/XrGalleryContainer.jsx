// import { Canvas } from "@react-three/fiber";
// import { ARButton, XR } from "@react-three/xr";
// import { useCallback, useState } from "react";
// import { CharacterAnimationsProvider } from "../../contexts/CharacterAnimations";
// import Interface from "./Interface";
// import XrGallery from "./XrGallery";

// const XrGalleryContainer = () => {
//   const [overlayContent, setOverlayContent] = useState(null);

//   let interfaceRef = useCallback((node) => {
//     if (node !== null) {
//       setOverlayContent(node);
//     }
//   });

//   return (
//     <>
//       <CharacterAnimationsProvider>
//         <ARButton
//           className="ar-button"
//           sessionInit={{
//             requiredFeatures: ["hit-test"],
//             optionalFeatures: ["dom-overlay"],
//             domOverlay: { root: overlayContent },
//           }}
//         />
//         <Canvas>
//           <XR>
//             <XrGallery />
//           </XR>
//         </Canvas>
//         <Interface ref={interfaceRef} />
//       </CharacterAnimationsProvider>
//     </>
//   );
// };

// export default XrGalleryContainer;


// import { Canvas } from "@react-three/fiber";
// import { ARButton, XR } from "@react-three/xr";
// import { useCallback, useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import { CharacterAnimationsProvider } from "../../contexts/CharacterAnimations";
// import Interface from "./Interface";
// import XrGallery from "./XrGallery";

// const XrGalleryContainer = () => {
//   const [overlayContent, setOverlayContent] = useState(null);
//   const navigate = useNavigate(); // Initialize the useNavigate hook

//   const handleARButtonClick = () => {
//     // Navigate to the desired route
//     navigate("/xr-cube"); // Replace with your desired route
//   };

//   const interfaceRef = useCallback((node) => {
//     if (node !== null) {
//       setOverlayContent(node);
//     }
//   }, []);

//   return (
//     <>
//       <CharacterAnimationsProvider>
//         <ARButton
//           className="ar-button"
//           sessionInit={{
//             requiredFeatures: ["hit-test"],
//             optionalFeatures: ["dom-overlay"],
//             domOverlay: { root: overlayContent },
//           }}
//           onClick={handleARButtonClick} // Add the onClick handler
//         />
//         <Canvas>
//           <XR>
//             <XrGallery />
//           </XR>
//         </Canvas>
//         <Interface ref={interfaceRef} />
//       </CharacterAnimationsProvider>
//     </>
//   );
// };

// export default XrGalleryContainer;

import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { CharacterAnimationsProvider } from "../../contexts/CharacterAnimations";
import Interface from "./Interface";
import XrGallery from "./XrGallery";

const XrGalleryContainer = () => {
  const [overlayContent, setOverlayContent] = useState(null);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleARButtonClick = () => {
    // Navigate to the desired route
    navigate("/web-xr"); // Replace with your desired route
  };

  const interfaceRef = useCallback((node) => {
    if (node !== null) {
      setOverlayContent(node);
    }
  }, []);

  // Inline styles for full-screen effect
  const containerStyle = {
    height: "100vh",
    width: "100vw",
    position: "relative",
    overflow: "hidden", // Prevent scrolling
  };

  return (
    <CharacterAnimationsProvider>
      <ARButton
        className="ar-button"
        sessionInit={{
          requiredFeatures: ["hit-test"],
          optionalFeatures: ["dom-overlay"],
          domOverlay: { root: overlayContent },
        }}
        onClick={handleARButtonClick} // Add the onClick handler
      />
      <div style={containerStyle}> {/* Apply inline styles */}
        <Canvas>
          <XR>
            <XrGallery />
          </XR>
        </Canvas>
      </div>
      <Interface ref={interfaceRef} />
    </CharacterAnimationsProvider>
  );
};

export default XrGalleryContainer;
