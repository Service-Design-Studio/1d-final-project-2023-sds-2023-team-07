import { Box, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Balance = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 20000);
    return () => clearTimeout(timer);
  }, [router]);

  const handleGoHome = () => {
    router.push("/");
  };

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
        Your account balance is ...
      </Text>
      <Button backgroundColor="dbsRed" color="white" onClick={handleGoHome}>
        Go Home
      </Button>
    </Box>
  );
};

export default Balance;
