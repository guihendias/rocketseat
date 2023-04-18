import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import { api } from "../services/api";

interface Transaction {
  id: string;
  title: string;
  value: number;
  category: string;
  type: "deposit" | "withdraw";
  createdAt: string;
}

type TransactionInput = Omit<Transaction, "id" | "createdAt">;

interface Props {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction(transaction: TransactionInput): Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export const TransactionsProvider: React.FC<Props> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get("/transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transaction: TransactionInput) {
    const response = await api.post("/transactions", {
      ...transaction,
      createdAt: new Date()
    });

    setTransactions([...transactions, response.data.transaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export function useTransactions() {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider"
    );
  }

  return context;
}
