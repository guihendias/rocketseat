import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { useState } from "react";
import { FlatList } from "react-native";

import { useTheme } from "styled-components";
import BackButton from "../../components/BackButton";
import Car from "../../components/Car";
import Loading from "../../components/Loading";
import { CarDTO } from "../../dtos/CarDTO";
import api from "../../services/api";

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate
} from "./styles";

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

const MyCars: React.FC = () => {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/schedules_byuser?user_id=1");
        setCars(response.data);
        console.log("asdasd", response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  return (
    <Container>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Header>
        <BackButton color={theme.colors.shape} onPress={handleGoBack} />

        <Title>
          Esolha uma{"\n"}data de início e{"\n"}fim de aluguel
        </Title>
        <SubTitle>Conforto, segurança e praticidade</SubTitle>
      </Header>

      <Content>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Appointments>
              <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
              <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
            </Appointments>

            <FlatList
              data={cars}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <CarWrapper>
                  <Car data={item.car} />
                  <CarFooter>
                    <CarFooterTitle>Período</CarFooterTitle>

                    <CarFooterPeriod>
                      <CarFooterDate>{item.startDate}</CarFooterDate>
                      <AntDesign
                        name="arrowright"
                        style={{ marginHorizontal: 10 }}
                        size={20}
                        color={theme.colors.title}
                      />
                      <CarFooterDate>{item.endDate}</CarFooterDate>
                    </CarFooterPeriod>
                  </CarFooter>
                </CarWrapper>
              )}
            />
          </>
        )}
      </Content>
    </Container>
  );
};

export default MyCars;
