const getPrevDate = (daysNumber) => {
  const day = new Date();
  day.setDate(day.getDate() - daysNumber);
  return day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate();
};
const getFormatedDate = (date) => {
  const russianMonths = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
  const parsedDate = Date.parse(date);
  const dateObj = new Date(parsedDate);
  const year = dateObj.getFullYear();
  const day = dateObj.getDate();
  const month = dateObj.getMonth();
  return day + ' ' + russianMonths[month] + ' ' + year;
};
const getInputsObj = (form) => {
  const result = {};
  Array.from(form.elements).forEach((elem) => {
    if (!elem.classList.contains('button')) {
      result[elem.name] = elem.value;
    }
  });
  return result;
};

export { getPrevDate, getInputsObj, getFormatedDate };
