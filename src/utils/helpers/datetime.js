
const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
];

export function dateConverter(datetime){
    datetime = new Date(datetime);
    const year = datetime.getFullYear();
    const month = months[datetime.getMonth()];
    const date = datetime.getDate();
    return `${date} ${month} ${year}`;
}

export function datetimeConverter(datetime){
    datetime = new Date(datetime);
    const year = datetime.getFullYear();
    const month = months[datetime.getMonth()];
    const date = datetime.getDate();
    const hour = datetime.getHours();
    const min = datetime.getMinutes();
    return `${date} ${month} ${year}, ${hour > 10 ? hour : `0${hour}`}:${min > 10 ? min : `0${min}`}`
}