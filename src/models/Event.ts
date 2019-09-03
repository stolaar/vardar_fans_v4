import User from "./User";
interface Event {
  id?: string;
  matchup: string;
  date: Date;
  time: string;
  price: string;
  place?: string;
  usersGoing: Array<User>;
}
export default Event;
