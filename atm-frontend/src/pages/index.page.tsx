import { Button, Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    // This will push to your desired path. Replace '/targetPath' with the actual path.
    router.push("/camera");
  };

  useEffect(() => {
    console.log(document.cookie);
    fetch("/api/logout", {
      method: "DELETE",
      credentials: "same-origin",
    })
      .then((response) => {
        if (!response.ok) {
          // If server returns a non-200/204 status, reject promise with status text
          return Promise.reject(response.statusText);
        }
        return response.json(); // or just return response if you don't need to read the response body
      })
      .then((data) => {
        console.log("Successfully logged out:", data); // handle success response if needed
      })
      .catch((error) => {
        console.error("Failed to log out:", error);
      });
  }, []);

  return (
    <Flex justify="center" align="center" height="100vh">
      <Box>
        <Button
          id="buttonid"
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
