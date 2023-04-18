import React, { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HighlightCard from "../../components/HighlightCard";
import TransactionCard, { Transaction } from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  TransactionsList,
  Transactions,
  Title,
  LogoutButton,
  LoadingContianer
} from "./styles";
import { useFocusEffect } from "@react-navigation/core";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";

export interface DataListProps extends Transaction {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expenses: HighlightProps;
  total: HighlightProps;
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  const theme = useTheme();
  const { signOut, user } = useAuth();

  function getLastTransactionDate(
    collection: DataListProps[],
    type: "positive" | "negative"
  ) {
    if (collection.length === 0) {
      return null;
    }

    const lastTransactions = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      )
    );

    return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleDateString(
      "pt-BR",
      { month: "long" }
    )}`;
  }

  async function loadTransactions() {
    const dataKey = `@gofinances:transactions_user${user.id}}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = (
      response ? JSON.parse(response) : []
    ) as DataListProps[];

    let entriesTotal = 0;
    let expensesTotal = 0;

    const formattedTransactions = transactions.map((item: DataListProps) => {
      if (item.type === "positive") {
        entriesTotal += Number(item.amount);
      } else {
        expensesTotal += Number(item.amount);
      }

      const amount = Number(item.amount).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
      const date = Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date
      };
    }) as DataListProps[];

    const total = entriesTotal - expensesTotal;

    const lastTransactionsEntries = getLastTransactionDate(
      transactions,
      "positive"
    );
    const lastTransactionsExpenses = getLastTransactionDate(
      transactions,
      "negative"
    );

    setTransactions(formattedTransactions);

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        }),
        lastTransaction: lastTransactionsEntries
          ? `Última entrada dia ${lastTransactionsEntries}`
          : ""
      },
      expenses: {
        amount: expensesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        }),
        lastTransaction: lastTransactionsExpenses
          ? `Última despesa dia ${lastTransactionsExpenses}`
          : ""
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        }),
        lastTransaction: lastTransactionsExpenses
          ? `01 à ${lastTransactionsExpenses}`
          : ""
      }
    });

    setLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {loading ? (
        <LoadingContianer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </LoadingContianer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo
                  }}
                />

                <User>
                  <UserGreeting>Olá, </UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>

              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData.expenses.amount}
              lastTransaction={highlightData.expenses.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionsList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TransactionCard key={item.title} transaction={item} />
              )}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
