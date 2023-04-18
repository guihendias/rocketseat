import React from "react";
import { useTheme } from "styled-components";
import { format } from "date-fns";
import BackButton from "../../components/BackButton";
import Calendar, { DayProps, MarkedDateProps } from "../../components/Calendar";

import ArrowSvg from "../../assets/arrow.svg";

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValueContainer,
  DateValue,
  Content,
  Footer
} from "./styles";
import { StatusBar } from "expo-status-bar";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { generateInterval } from "../../components/Calendar/generateInterval";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { Alert } from "react-native";
import { CarDTO } from "../../dtos/CarDTO";
import { useRoute } from "@react-navigation/native";

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}

const Scheduling: React.FC = () => {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const route = useRoute();
  const { car } = route.params as Params;
  const theme = useTheme();
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleConfirm() {
    if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      return Alert.alert("Selecione o período para alugar");
    }
    navigation.navigate("SchedulingDetails", {
      car,
      dates: Object.keys(markedDates)
    });
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);

    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        "dd/MM/yyyy"
      ),
      endFormatted: format(getPlatformDate(new Date(endDate)), "dd/MM/yyyy")
    });
  }

  return (
    <Container>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <Header>
        <BackButton color={theme.colors.shape} onPress={handleGoBack} />

        <Title>
          Esolha uma{"\n"}data de início e{"\n"}fim de aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValueContainer selected={!!rentalPeriod.startFormatted}>
              <DateValue>{rentalPeriod.startFormatted}</DateValue>
            </DateValueContainer>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValueContainer selected={!!rentalPeriod.endFormatted}>
              <DateValue>{rentalPeriod.endFormatted}</DateValue>
            </DateValueContainer>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          enabled={!!rentalPeriod.startFormatted}
          onPress={handleConfirm}
        />
      </Footer>
    </Container>
  );
};

export default Scheduling;
