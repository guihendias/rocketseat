import React from "react";
import { Feather } from "@expo/vector-icons";

import {
  Calendar as CustomCalendar,
  LocaleConfig,
  CalendarList
} from "react-native-calendars";
import { useTheme } from "styled-components";
import { StyleSheet } from "react-native";
import { ptBR } from "./localeConfig";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

export interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  };
}

export interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}
interface CalendarProps {
  markedDates: MarkedDateProps;
  onDayPress: (date: any) => void;
}

const Calendar: React.FC<CalendarProps> = ({ markedDates, onDayPress }) => {
  const theme = useTheme();

  return (
    <CustomCalendar
      firstDay={1}
      minDate={new Date()}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
      renderArrow={(direction) => (
        <Feather
          size={24}
          color={theme.colors.text}
          name={`chevron-${direction}`}
        />
      )}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_regular,
        textDayHeaderFontFamily: theme.fonts.primary_medium,
        textDayHeaderFontSize: 10,
        textMonthFontFamily: theme.fonts.secondary_medium,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15
        }
      }}
    />
  );
};

export default Calendar;
