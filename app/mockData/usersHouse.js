import currentUser1 from './currentUser1.js';
import currentUser2 from './currentUser2.js';

const bill1 = {
  allUsersTotals: [
    {
      id: currentUser1.id,
      paid: false,
      total: 50
    },
    {
      id: currentUser2.id,
      paid: false,
      total: 50
    }
  ],
  datePosted: "11/01/2017",
  details: "We used a lot of water.",
  duedate: "11/9/17",
  id: "b3019762705779",
  parsedDuedate: 1510210800000,
  postedBy: currentUser1,
  title: "Water Bill",
  total: "100"
};

const bulletin1 = {
  datePosted: "11/01/2017",
  details: "The dogs got out through a hole in the fence yesterday.",
  hasRead: [currentUser1.id],
  id: 1509567098747,
  postedBy: currentUser1,
  title: "Don't leave dogs out unattended."
};

const chore1 = {
  assignedTo: currentUser1.id,
  datePosted: "10/31/2017",
  details: "Empty the dishwasher.",
  done: false,
  id: "c1509485241076",
  postedBy: currentUser1,
  title: "Dishes",
  urgency: "low"
};

const usersHouse = {
  houseKey: "-KxoIBWy5UYRscFYdWty",
  bills: [bill1],
  bulletins: [bulletin1],
  chores: [chore1],
  houseCode: "woof9",
  houseName: "Dog9",
  users: [currentUser1, currentUser2]
};

export default usersHouse;
