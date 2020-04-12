import { random, finance, name, image, date, address, commerce } from 'faker';
import { uniqBy } from 'lodash';
import moment from 'moment';

export const ticketTypes = ['regular', 'vip', 'vvip', 'table'];
export const socials = ['facebook', 'twitter', 'instagram', 'youtube'];

const eventData = Array.from({ length: random.number(50) }, () => ({
  title: random.words(3),
  location: `${address.city()}, ${address.country()}`,
  date: random.arrayElement([
    date.future(2),
    null,
    new Date().toISOString(),
    date.past(3),
  ]),
  about: random.words(15),
  flyer: image.nightlife(),
  attendees: Array.from({ length: random.number(50) }, () => ({
    fullName: name.findName(),
    avatar: image.people(),
    ticketType: random.arrayElement(ticketTypes),
    tickets: uniqBy(
      Array.from({ length: random.number(ticketTypes.length) }, () => ({
        bookedAt: random.arrayElement([
          new Date().toISOString(),
          date.past(random.number(3)),
        ]),
        type: random.arrayElement(ticketTypes),
        count: random.number(3),
      })),
      'type'
    ),
  })),
  prices: {
    [ticketTypes[0]]: Number(commerce.price(500, 5000, 0)),
    [ticketTypes[1]]: Number(commerce.price(5001, 10000, 0)),
    [ticketTypes[2]]: Number(commerce.price(10001, 20000, 0)),
    [ticketTypes[3]]: Number(commerce.price(20001, 100000, 0)),
  },
  currency: finance.currencyCode(),
}));

export const events = eventData.map((e) => ({
  ...e,
  published: e.date && random.boolean(),
}));

const social = {};
Array.from({ length: random.number(4) }, () => {
  social[random.arrayElement(socials)] = random.image();
  return true;
});

const people = Array.from({ length: 435 }, () => ({
  fullName: name.findName(),
  accountType: 'brand',
  avatar: image.people(),
  coverImage: image.nature(),
  about: random.words(15),
  social,
}));

export const messages = Array.from({ length: random.number(140) }, () => ({
  content: random.words(random.number(20)),
  timestamp: random.arrayElement([date.past(3), date.month({ abbr: true })]),
  author: { fullName: name.findName(), avatar: image.people() },
  unread: random.boolean(),
}));

export const currentUser = { ...people[0], followers: people.slice(1), events };
