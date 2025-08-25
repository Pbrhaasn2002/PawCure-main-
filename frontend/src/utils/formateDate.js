// export const formateDate =(date, config) => {

//     const defaultOptions = {day:'numeric', month:'short', year:'numeric'}
//     const option = config ? config : defaultOptions

//     return new Date(date).toLocaleDateString('en-US', option);
// }


export const formateDate = (date, config) => {
    if (!date) {
        return "Invalid Date";
    }

    const defaultOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    const options = config ? config : defaultOptions;

    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    
    return formattedDate;
};
