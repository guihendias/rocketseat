import React from "react";
import LottieView from "lottie-react-native";

import loadingAnimation from "../../assets/loading_animation.json";

import { Container } from "./styles";

const LoadingAnimated: React.FC = () => {
  return (
    <Container>
      <LottieView
        source={loadingAnimation}
        style={{ height: 200 }}
        autoPlay
        loop
        resizeMode="contain"
      />
    </Container>
  );
};

export default LoadingAnimated;
