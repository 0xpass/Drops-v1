import { toast } from "react-toastify";

// would appreciate if anyone who forks this repo contributes new error messages back to the main branch so that we can best enable plain english messages for all error types
const errorMessages = [
  {
    error: "gas required exceeds allowance",
    solution: "Insufficient balance. Add more funds to your wallet.",
  },
  {
    error: "err: insufficient funds for gas",
    solution: "Insufficient balance. Add more funds to your wallet.",
  },
  {
    error: "A wallet request of type eth_accounts was made to a disconnected wallet",
    solution: "Please switch network to Ethereum Mainnet.",
  },
];

const handleTxError = (error:any) => {
  console.error(error);
  const primaryError = error?.data?.message;
  const nestedError = error?.error?.message;
  const fallbackError = error.message;
  let customToastMessage;

  for (let i = 0; i < errorMessages.length; i++) {
    if (primaryError?.includes(errorMessages[i].error) || 
      nestedError?.includes(errorMessages[i].error || 
      fallbackError?.includes(errorMessages[i].error))) {
        customToastMessage = errorMessages[i].solution;
    }
  }

  const toastMessage =
    customToastMessage || primaryError || nestedError || fallbackError;
  toast.error(toastMessage);
};

export default handleTxError;
