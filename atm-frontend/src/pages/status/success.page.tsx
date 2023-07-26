import { useRouter } from "next/router";
import { Box, Heading, Code, Button } from "@chakra-ui/react";

const Success = () => {
  const router = useRouter();
  const { data } = router.query;
  const jsonData = data ? JSON.parse(data as string) : null;

  const navigateToBalance = () => {
    router.push("/status/balance");
  };

  return (
    <Box padding="6" boxShadow="lg" bg="white">
      <Heading as="h2" size="xl" marginBottom="2">
        Success Page
      </Heading>
      <Code
        display="block"
        whiteSpace="pre"
        overflowX="auto"
        colorScheme="teal"
      >
        {JSON.stringify(jsonData, null, 2)}
      </Code>
      <Button onClick={navigateToBalance} colorScheme="teal" marginTop="2">
        Check Balance
      </Button>
    </Box>
  );
};

export default Success;
