import {
    createAttendee,
    deleteAttendee,
    fetchAttendeeById,
    fetchAttendees,
} from 'Api/client';

let attendeeName, attendeeGuests;

const Attendee = (name = '', guests = 0) => {
    setName(name);
    setGuests(guests);

    return {
        create,
        deleteOne,
        fetchAll,
        fetchById,
        setName,
        setGuests,
    }
};

function create() {
    return createAttendee(attendeeName, attendeeGuests);
}

function deleteOne(id) {
    return deleteAttendee(id);
}

async function fetchAll() {
    let attendees = [];

    try {
        const result = await fetchAttendees();

        attendees = result.data;
    } catch (e) {
        console.error(e);
    }

    return attendees;
}

async function fetchById(id) {
    let attendee = [];

    try {
        const result = await fetchAttendeeById(id);

        attendee = result.data;
    } catch (e) {
        console.error(e);
    }

    return attendee;
}

function setName(name) {
    attendeeName = name;
}

function setGuests(guests) {
    attendeeGuests = guests;
}

module.exports = Attendee;