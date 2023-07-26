import { Box, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Fail = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 20000);
    return () => clearTimeout(timer);
  }, [router]);

  const handleTryAgain = () => {
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
      bg="red.50"
      p={3}
    >
      <Text fontSize="4xl" color="red.500" textAlign="center" mb="4">
        Please retry the scanning again.
      </Text>
      <Button
        onClick={handleTryAgain}
        backgroundColor="dbsRed"
        textColor="white"
      >
        {" "}
        Try Again
      </Button>
    </Box>
  );
};

export default Fail;
