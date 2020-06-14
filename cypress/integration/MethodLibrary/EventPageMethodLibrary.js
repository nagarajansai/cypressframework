import CommonMethodLibrary from "../CommonLibrary/CommonMethodLibrary"
const cml = new CommonMethodLibrary();

class EventPageMethodLibrary {

     getNewDate(eventDate) {
        let dateStatus;
        if (eventDate == null) {
            eventDate = "Event date is empty";
        }
        else if (eventDate.includes(' in ')) {
            eventDate = eventDate.split('in')[0].replace(' ', ',').replace(/\s/g, '')
            dateStatus = 'Valid';
        } else if (eventDate.includes('|')) {
            // cy.log(eventDate)
            eventDate = eventDate.split('|')[0].replace(/\s/g, '').replace('.', ',')
            dateStatus = 'Valid';
        } else {
            eventDate = "No EventDate";
            dateStatus = 'inValid';
        }
        if (dateStatus === 'Valid') {
            let dateVal = eventDate.split(',')[1].split('-');
            let minDateVal = Math.min(...dateVal);
            let monthVal = cml.getMonth(cml.convertDate(eventDate));
            let yearVal = cml.getYear(cml.convertDate(eventDate.split(',')[2]));
            eventDate = `${yearVal}-${monthVal}-${minDateVal}`;
        }
        return eventDate;
    }
    
    

}
export default EventPageMethodLibrary;