import React, { useState } from 'react';
import { Icon } from './Icon';
import { Task } from './Task';

type Props = {
  currentTask: Task;
  updateTask: (
    id: number,
    title: string,
    iconName: string,
    iconColor: string
  ) => void;
};

type Selected = {
  icon: string;
  color: string;
};

const iconNames = [
  'scissors',
  'watering',
  'running',
  'meal',
  'book',
  'study',
  'walking',
  'dental',
  'hospital',
  'movie',
  'medicine',
  'pet',
  'heart',
  'cycling',
  'smoking',
  'beer',
];

const colorCodes = [
  '9c5e31',
  'ff9500',
  'f62e36',
  'e85298',
  '8f76d6',
  '0079c2',
  '00a7db',
  '009bbf',
  '00ac9b',
  '888888',
  '000000',
];

export const EditDialog = (props: Props) => {
  const [selected, setSelected] = useState<Selected>({
    icon: props.currentTask.iconName,
    color: props.currentTask.iconColor,
  });

  const [text, setText] = useState(props.currentTask.title);

  const handleIconClick = (iconName: string) => {
    setSelected((selected) => ({ ...selected, icon: iconName }));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected((selected) => ({ ...selected, color: `#${e.target.value}` }));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <>
      <div
        className="overlay"
        onClick={() =>
          props.updateTask(
            props.currentTask.id,
            text,
            selected.icon,
            selected.color
          )
        }
      ></div>
      <div className="edit-task">
        <button
          className="update"
          type="button"
          onClick={() =>
            props.updateTask(
              props.currentTask.id,
              text,
              selected.icon,
              selected.color
            )
          }
        >
          ×
        </button>

        <Task
          title={text}
          updatedAtUTC={props.currentTask.updatedAtUTC}
          iconName={selected.icon}
          iconColor={selected.color}
          handleTextChange={handleTextChange}
        />

        <h2>アイコンを選択</h2>
        <ul className="icon-list">
          {iconNames.map((iconName) => {
            return (
              <li key={iconName} onClick={() => handleIconClick(iconName)}>
                {selected.icon === iconName ? (
                  <span className="selected">
                    <Icon name={iconName} color={selected.color} />
                  </span>
                ) : (
                  <Icon name={iconName} color={selected.color} />
                )}
              </li>
            );
          })}
        </ul>

        <h2>色を選択</h2>
        <ul className="color-list">
          {colorCodes.map((colorCode) => {
            return (
              <li key={colorCode}>
                <input
                  type="radio"
                  name="color"
                  id={`c-${colorCode}`}
                  value={colorCode}
                  onChange={(e) => handleColorChange(e)}
                />
                <label
                  htmlFor={`c-${colorCode}`}
                  style={{ background: `#${colorCode}` }}
                ></label>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
