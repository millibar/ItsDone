import { Icon } from './Icon';
import { useEffect, useRef } from 'react';
import { elapsedString, toLocaleDateOrTimeString } from '../calcElapsedTime';

type Props = {
  title: string;
  updatedAtUTC: number;
  iconName: string;
  iconColor: string;
  handleTextChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const initialTask: Task = {
  title: '',
  id: 0,
  updatedAtUTC: 0,
  iconName: '',
  iconColor: '#000000',
};

export const Task = (props: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="task">
      {props.handleTextChange ? (
        <h1>
          <input
            ref={inputRef}
            type="text"
            value={props.title}
            placeholder="新しいタスク"
            onChange={(e) =>
              props.handleTextChange ? props.handleTextChange(e) : false
            }
          />
        </h1>
      ) : (
        <h1>{props.title}</h1>
      )}

      <Icon name={props.iconName} color={props.iconColor} />

      <p>
        <strong>{elapsedString(props.updatedAtUTC, Date.now())}</strong> since{' '}
        <time>
          {toLocaleDateOrTimeString(props.updatedAtUTC, Date.now(), [])}
        </time>
      </p>
    </div>
  );
};
