type Props = {
  createTask: () => void;
};

import { toDateString } from '../calcElapsedTime';

export const Header = (props: Props) => {
  return (
    <header>
      <h1>{toDateString(new Date(), [])}</h1>
      <button type="button" className="create-task" onClick={props.createTask}>
        ＋
      </button>
    </header>
  );
};
