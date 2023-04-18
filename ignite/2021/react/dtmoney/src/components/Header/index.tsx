import logoImg from "../../assets/logo.svg";
import { Container, Content } from "./styles";

interface Props {
  onOpenNewTransactionModal: () => void;
}

const Header: React.FC<Props> = ({ onOpenNewTransactionModal }) => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button onClick={onOpenNewTransactionModal}>Nova transação</button>
      </Content>
    </Container>
  );
};

export default Header;
