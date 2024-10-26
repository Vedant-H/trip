// import React, { useEffect, useRef } from "react";
// import { useGLTF, useAnimations } from "@react-three/drei";
// import { useCharacterAnimations } from "../../contexts/CharacterAnimations";

// export default function Druid(props) {
//   const group = useRef();
//   const { nodes, materials, animations } = useGLTF("/models/free__burj_khalifa_dubai.glb");
//   const { actions, names } = useAnimations(animations, group);

//   const { setAnimations, animationIndex, Color } = useCharacterAnimations();

//   useEffect(() => {
//     setAnimations(names);
//   }, []);

//   useEffect(() => {
//     actions[names[animationIndex]].reset().fadeIn(0.5).play();

//     return () => {
//       actions[names[animationIndex]]?.fadeOut(0.5);
//     };
//   }, [animationIndex]);

//   return (
//     <group ref={group} {...props} dispose={null}>
//       <group scale={1.91}>
//         <primitive object={nodes.root} />
//         <skinnedMesh
//           material={materials.color_main}
//           material-color={Color}
//         />
//       </group>
//     </group>
//   );
// }

// useGLTF.preload("/models/free__burj_khalifa_dubai.glb");

// import { useLoader } from "@react-three/fiber";
// import { Suspense } from "react";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// const Model = ({ position }) => {
//   const gltf = useLoader(GLTFLoader, "/models/resto_ni_teo.glb");
//   return (
//     <Suspense fallback={null}>
//       <primitive position={position} object={gltf.scene} />
//     </Suspense>
//   );
// };

// export default Model;


import { useEffect, Suspense } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useCharacterAnimations } from "./../../contexts/CharacterAnimations";

const Druid = () => {
  const { currentModelName } = useCharacterAnimations();
  const gltf = useLoader(GLTFLoader, `/models/resto_ni_teo.glb`);

  return (
    <Suspense fallback={null}>
      <primitive
        object={gltf.scene}
        scale={1} // Adjust scale as necessary
        position={[0, 0, 0]} // Adjust position if needed
      />
    </Suspense>
  );
};

export default Druid;
