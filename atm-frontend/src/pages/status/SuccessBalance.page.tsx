import { Box, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UserData } from "@/types";

const SuccessBalance = () => {
  const router = useRouter();
  const { data } = router.query;

  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleGoHome();
    }, 20000);

    // You don't need to extract user_id from the query anymore since the handler doesn't use it.

    // Fetch directly without the query parameter
    fetch(`/api/getUserBalance`, {
      method: "GET",
      credentials: "same-origin", // Ensure cookies are sent
    })
      .then((response) => response.json())
      .then((data) => setUser(data as UserData)) // assert 'data' to be of type 'UserData'
      .catch(console.error);

    return () => clearTimeout(timer);
  }, [router, data]);

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
      <Text id="textboxid" fontSize="4xl" mb="4">
        {user
          ? `Your account balance is $${Number(user.balance).toFixed(2)}`
          : "Loading..."}
      </Text>
      <Button
        id="buttonid"
        backgroundColor="dbsRed"
        color="white"
        onClick={handleGoHome}
      >
        Go Home
      </Button>
    </Box>
  );
};

export default SuccessBalance;
