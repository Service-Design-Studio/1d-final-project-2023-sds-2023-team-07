import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Text,
  Button,
  Center,
  NumberInput,
  NumberInputField,
  useToast,
} from "@chakra-ui/react";
import { TransactionData } from "@/types";

const Transaction = () => {
  const router = useRouter();
  const { data } = router.query;

  const [transaction, setTransaction] = useState<TransactionData | null>(null);
  const [inputValue, setInputValue] = useState<number>(0);
  const toast = useToast();

  const handleButtonClick = () => {
    if (transaction) {
      fetch("/api/postTransaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            // Throw error if there's an error in the response data
            throw new Error(data.error);
          } else {
            return fetch(
              `/api/patchUserIsActive?user_id=${transaction.user_id}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ is_active: 1 }),
              }
            );
          }
        })
        .then((response) => {
          if (response.ok) {
            router.push({
              pathname: "/status/SuccessBalance",
              query: { data: JSON.stringify(transaction) },
            });
          } else {
            throw new Error("Failed to update user status");
          }
        })
        .catch((error) => {
          console.error(error);
          // On error, PATCH is_active to 2 and then route to NotEnoughMoneyFail
          fetch(`/api/patchUserIsActive?user_id=${transaction.user_id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ is_active: 2 }),
          })
            .then(() => {
              console.log("routing bokek");
              router.push({
                pathname: "/status/NotEnoughMoneyFail",
                query: { data: JSON.stringify(transaction) },
              });
            })
            .catch((patchError) => {
              console.error("Failed to PATCH is_active: ", patchError);
            });
        });
    }
  };

  useEffect(() => {
    if (data && typeof data === "string") {
      let transactionData: TransactionData = JSON.parse(data);
      transactionData.atm_machine_id = 1; // Add the atm_machine_id here

      console.log(transactionData);
      setTransaction(transactionData);
    }

    const timer = setTimeout(() => {
      router.push("/status/TimeoutFail");
    }, 20000);

    return () => clearTimeout(timer);
  }, [data, toast, router]);

  return (
    <Center height="100vh" flexDirection="column">
      {transaction && transaction.transaction_type === "NCD" && (
        <>
          <Text id="textboxid" fontSize="xl">
            Deposit your cash now
          </Text>
          <NumberInput
            defaultValue={0}
            min={0}
            onChange={(valueString) => setInputValue(Number(valueString))}
            onBlur={() =>
              setTransaction((prevTransaction) =>
                prevTransaction
                  ? { ...prevTransaction, amount: inputValue }
                  : null
              )
            }
          >
            <NumberInputField />
          </NumberInput>
        </>
      )}
      {transaction && transaction.transaction_type === "AWL" && (
        <Text id="textboxid" fontSize="xl">
          Withdraw ${transaction.amount} now
        </Text>
      )}
      <Button
        id="buttonid"
        backgroundColor="dbsRed"
        textColor="white"
        mt={4}
        onClick={handleButtonClick}
      >
        Done
      </Button>
    </Center>
  );
};

export default Transaction;
