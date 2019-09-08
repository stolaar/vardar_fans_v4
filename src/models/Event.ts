import User from "./User";
interface Event {
  id?: string;
  matchup: string;
  date: Date;
  time: string;
  price: string;
  place?: string;
  usersGoing: Array<User>;
  show?: boolean;
  usersGoingCount?: number;
  expired?: boolean;
}
export default Event;
