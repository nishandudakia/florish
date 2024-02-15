const Event = require('../../../models/Events')
const db = require('../../../db/connect')

describe('Event', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('Event getAll method', () => {
        it('should return an array of Event instances', async () => {
            jest.spyOn(db, 'query').mockedResolvedValueOnce({rows: [
                { event_id: 3, event_name: 'puppy spa', organiser_id: 1, date: '2024-05-21T8:00', number_of_attendees: 12, description: 'A place to pamper your pooches in return for all the love they give', location: 'Florin grooming salon', accepted_status: true, list_of_attendees: 'Mason, Scarlet, and more', image: 'url' },
                { event_id: 2, event_name: 'boxing', organiser_id: 2, date: '2024-04-11T9:00', number_of_attendees: 7, description: 'Learn to box', location: 'Florin Gym', accepted_status: false, list_of_attendees: 'Jason, Ruby, and more', image: 'url' },
                { event_id: 3, event_name: 'Grannys knitting class', organiser_id: 1, date: '2024-03-15T12:00', number_of_attendees: 18, description: 'Start a new hobby by taking up knitting', location: 'Florin community hall', accepted_status: true, list_of_attendees: 'Melisa, Jenna and more', image: 'url' }
            ]})
    
            const events = await Event.getAll();

            expect(Array.isArray(events)).toBe(true);
            expect(events.every(event => event instanceof Event)).toBe(true);
        });
    
        it('should throw an error if no events are available', async () => {
            const mockedResponse = { rows: [] };
            db.query = jest.fn().mockResolvedValue(mockedResponse);
    
            await expect(Event.getAll()).rejects.toThrow("No events available.");
        });
    });

    
});