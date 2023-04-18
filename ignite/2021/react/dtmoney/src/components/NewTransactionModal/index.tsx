import React, { useState } from "react";
import ReactModal from "react-modal";

import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { useTransactions } from "../../hooks/useTransactions";

import { Container, RadioBox, TransactionTypeContainer } from "./styles";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
}

const NewTransactionModal: React.FC<Props> = ({ isOpen, onRequestClose }) => {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState("");

  const [type, setType] = useState<"deposit" | "withdraw">("deposit");

  async function handleCreateNewTransaction(e: React.FormEvent) {
    e.preventDefault();

    await createTransaction({
      title,
      value,
      category,
      type
    });

    setTitle("");
    setValue(0);
    setCategory("");
    setType("deposit");
    onRequestClose();
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button onClick={onRequestClose} className="react-modal-close">
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Titulo"
        />

        <input
          type="number"
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          placeholder="Valor"
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            isActive={type === "deposit"}
            onClick={() => setType("deposit")}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            isActive={type === "withdraw"}
            onClick={() => setType("withdraw")}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saida" />
            <span>Saida</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          type="text"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          placeholder="Categoria"
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </ReactModal>
  );
};

export default NewTransactionModal;
