import React from 'react';
import Calendar from 'react-native-calendars/src/calendar';
import { Text } from 'react-native';
import moment from 'moment';
import { getPurchaseHistoryByRange } from '~/firebaseStore';

const currentDate = moment().format('YYYY-MM-D');
const oneDay = 24*60*60*1000;

export default class AppCalendar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dateSelected: {
        ['']: {selected: true},
      },
      multiSelect: false,
    }
  }

  onDayPress = (day) => {
    if (this.state.multiSelect) {
      this.endMultiselect(day);
    } else {
      this.props.selectedDay(day);
      this.selectDay(day);
    }
  }

  selectDay = (day) => {
    this.selected = day.dateString;
    this.setState({
      dateSelected: {
        [day.dateString]: {selected: true},
      },
    });
  }
  
  startMultiSelect = (day) => {
    this.selectDay(day);
    this.setState({ multiSelect: true });
  }

  getCountFullDaysBetweenRange = (start, end, IsStartToEnd) => {
    const a = new Date(start);
    const b = new Date(end);
    const daysCount = Math.round(Math.abs((a.getTime() - b.getTime())/(oneDay)));
    const startPoint = IsStartToEnd ? start : end;
    const dateSelected = {};
    const dataForQuery = {};
    for(let i=0; i<=daysCount; i++) {
      const nextDay = moment(startPoint).add(i, 'd').format('YYYY-MM-DD');
      const splitedDate = nextDay.split('-');
      if (!dataForQuery[splitedDate[0]]) dataForQuery[splitedDate[0]] = {}
      if (!dataForQuery[splitedDate[0]][splitedDate[1]]) dataForQuery[splitedDate[0]][splitedDate[1]] = [];
      dataForQuery[splitedDate[0]][splitedDate[1]].push(splitedDate[2]);

      dateSelected[nextDay] = { selected: true };
    }

    return { dateSelected, dataForQuery }
  }
  
  endMultiselect = (endDay) => {
    this.setState({ multiSelect: false });
    const firstDate = Object.keys(this.state.dateSelected)[0];
    const secondDate = endDay.dateString;
    const isWayToFuture = moment(firstDate).isBefore(secondDate);
    const startPoint = isWayToFuture ? firstDate : secondDate;
    const { dateSelected, dataForQuery } = this.getCountFullDaysBetweenRange(firstDate, secondDate, isWayToFuture);
    
    
    this.setState({ dateSelected });
    // const endPoint = moment(isWayToFuture ? secondDate : firstDate);

    // while()

    console.log('dateSelected', dateSelected);
    console.log('dataForQuery', dataForQuery);
  }
  
  render() {
    return (
      <Calendar
        // markedDates={{[this.selected]: {selected: true, disableTouchEvent: true }}}
        markedDates={this.state.dateSelected}
        // Initially visible month. Default = Date()
        // current={currentDate}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={'2018-10-15'}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        // maxDate={'2012-05-30'}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={day => this.onDayPress(day)}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={day => this.startMultiSelect(day)}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'MMMM yyyy'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        // onMonthChange={(month) => {console.log('month changed', month)}}
        // Hide month navigation arrows. Default = false
        // hideArrows={false}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        // disableMonthChange={false}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        // firstDay={1}
        // Hide day names. Default = false
        // hideDayNames={false}
        // Show week numbers to the left. Default = false
        showWeekNumbers={true}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        // onPressArrowLeft={substractMonth => substractMonth()}
        // Handler which gets executed when press arrow icon left. It receive a callback can go next month
        // onPressArrowRight={addMonth => addMonth()}
        style={{ borderWidth: 3, borderColor: '#b6c1cd', height: 355, borderRadius: 10 }}
        // Specify theme properties to override specific styles for calendar parts. Default = {}
        // theme={{
        //   backgroundColor: '#ffffff',
        //   calendarBackground: '#ffffff',
        //   textSectionTitleColor: '#b6c1cd',
        //   selectedDayBackgroundColor: '#fdb800',
        //   selectedDayTextColor: '#ffffff',
        //   todayTextColor: '#00adf5',
        //   dayTextColor: '#2d4150',
        //   textDisabledColor: '#d9e1e8',
        //   dotColor: '#00adf5',
        //   selectedDotColor: 'red',
        //   arrowColor: 'orange',
        //   monthTextColor: '#fdb800',
        //   textMonthFontWeight: 'bold',
        //   textDayFontSize: 14,
        //   textMonthFontSize: 16,
        //   textDayHeaderFontSize: 14,
        // }}
      />
    );
  }
}