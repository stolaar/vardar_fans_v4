import User from "./User";
interface Event {
  matchup: string;
  date: Date;
  time: string;
  price: string;
  place?: string;
  usersGoing: Array<User>;
}
export default Event;
