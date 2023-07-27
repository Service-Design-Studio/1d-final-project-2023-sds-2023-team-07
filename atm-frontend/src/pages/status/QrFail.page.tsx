import { Box, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const WrongQRCode = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleGoHome();
    }, 20000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
      p={3}
    >
      <Text fontSize="4xl" mb="4">
        Wrong QR Code Format
      </Text>
      <Button backgroundColor="dbsRed" color="white" onClick={handleGoHome}>
        Go Home
      </Button>
    </Box>
  );
};

export default WrongQRCode;
