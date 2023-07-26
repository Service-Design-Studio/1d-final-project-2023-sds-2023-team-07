// src/index.page.tsx
import { Button, Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    // This will push to your desired path. Replace '/targetPath' with the actual path.
    router.push("/camera");
  };

  return (
    <Flex justify="center" align="center" height="100vh">
      <Box>
        <Button
          onClick={handleButtonClick}
          backgroundColor="dbsRed"
          textColor="white"
        >
          Scan QR
        </Button>
      </Box>
    </Flex>
  );
};

export default HomePage;
