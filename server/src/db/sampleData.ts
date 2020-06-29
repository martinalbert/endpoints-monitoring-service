import User from '../entities/User'
import MonitoredEndpoint from '../entities/MonitoredEndpoint'
import MonitoringResult from '../entities/MonitoringResult'

const user1 = new User(
    1,
    'Applifting',
    'info@applifting.cz',
    '93f39e2f-80de-4033-99ee-249d92736a25'
)
const user2 = new User(
    2,
    'Batman',
    'batman@example.com',
    'dcb20f8a-5657-4f1b-9f7f-ce65739b359e'
)

const endpoint1 = new MonitoredEndpoint(
    1,
    'better programming medium',
    'https://medium.com/better-programming',
    new Date(),
    new Date(),
    60,
    user1
)
const endpoint2 = new MonitoredEndpoint(
    2,
    'applifting medium',
    'https://medium.com/applifting-cz',
    new Date(),
    new Date(),
    40,
    user1
)
const endpoint3 = new MonitoredEndpoint(
    3,
    'dc-comics',
    'https://www.dccomics.com/',
    new Date(),
    new Date(),
    10,
    user2
)
const endpoint4 = new MonitoredEndpoint(
    4,
    'batgirl',
    'https://www.dccomics.com/characters/batgirl',
    new Date(),
    new Date(),
    10,
    user2
)
const endpoint5 = new MonitoredEndpoint(
    5,
    'batman',
    'https://www.dccomics.com/characters/batman',
    new Date(),
    new Date(),
    20,
    user2
)
const endpoint6 = new MonitoredEndpoint(
    6,
    'joker',
    'https://www.dccomics.com/characters/joker',
    new Date(),
    new Date(),
    20,
    user2
)
const endpoint7 = new MonitoredEndpoint(
    7,
    'bane',
    'https://www.dccomics.com/characters/bane',
    new Date(),
    new Date(),
    20,
    user2
)
const endpoint8 = new MonitoredEndpoint(
    8,
    'harley quinn',
    'https://www.dccomics.com/characters/harley-quinn',
    new Date(),
    new Date(),
    40,
    user2
)
const endpoint9 = new MonitoredEndpoint(
    9,
    'mister freeze',
    'https://www.dccomics.com/characters/mister-freeze',
    new Date(),
    new Date(),
    40,
    user2
)
const endpoint10 = new MonitoredEndpoint(
    10,
    'penguin',
    'https://www.dccomics.com/characters/penguin',
    new Date(),
    new Date(),
    40,
    user2
)
const endpoint11 = new MonitoredEndpoint(
    11,
    'clayface',
    'https://www.dccomics.com/characters/clayface',
    new Date(),
    new Date(),
    40,
    user2
)
const endpoint12 = new MonitoredEndpoint(
    12,
    'riddler',
    'https://www.dccomics.com/characters/riddler',
    new Date(),
    new Date(),
    60,
    user2
)
const endpoint13 = new MonitoredEndpoint(
    13,
    'black mask',
    'https://www.dccomics.com/characters/black-mask',
    new Date(),
    new Date(),
    60,
    user2
)

export default {
    users: [user1, user2],
    endpoints: [
        endpoint1,
        endpoint2,
        endpoint3,
        endpoint4,
        endpoint5,
        endpoint6,
        endpoint7,
        endpoint8,
        endpoint9,
        endpoint10,
        endpoint11,
        endpoint12,
        endpoint13,
    ],
}
