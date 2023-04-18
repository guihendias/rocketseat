import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { format } from "date-fns";

import Accessory from "../../components/Accessory";
import BackButton from "../../components/BackButton";
import ImageSlider from "../../components/ImageSlider";

import {
  Container,
  Header,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuote,
  RentalPriceTotal,
  Footer
} from "./styles";
import Button from "../../components/Button";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAcessoryIcon";
import { useEffect } from "react";
import { getPlatformDate } from "../../utils/getPlatformDate";
import api from "../../services/api";
import { Alert } from "react-native";

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

const SchedulingDetails: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentTotal = Number(dates.length * car.rent.price);

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleConfirm() {
    try {
      setLoading(true);
      const scheduleByCar = await api.get(`/schedules_bycars/${car.id}`);

      const unavailable_dates = [
        ...scheduleByCar.data.unavailable_dates,
        ...dates
      ];

      await api.post(`/schedules_byuser`, {
        car,
        user_id: 1,
        startDate: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
        endDate: format(
          getPlatformDate(new Date(dates[dates.length - 1])),
          "dd/MM/yyyy"
        )
      });

      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates
      });

      navigation.navigate("Confirmation", {
        title: "Carro alugado!",
        message:
          "Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel",
        nextScreenRoute: "Home"
      });
    } catch (error) {
      setLoading(false);
      Alert.alert("Não foi possível realizar o agendamento");
    }
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      )
    });
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>

      <ImageSlider imagesUrl={car.photos} />

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(15)}
            color={theme.colors.shape}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuote>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuote>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          loading={loading}
          color={theme.colors.success}
          onPress={handleConfirm}
        />
      </Footer>
    </Container>
  );
};

export default SchedulingDetails;
