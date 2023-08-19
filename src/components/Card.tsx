import { Icon } from './Icon';
import { Task, initialTask } from './Task';

type Props = {
  tasks: Task[];
  currentTask: Task;
  done: (id: number, updatedAtUTC: number) => void;
  setCurrentTask: (currentTask: Task) => void;
  handleEditOnClick: (currentTask: Task) => void;
  handleDeleteOnClick: (currentTask: Task) => void;
};

export const Card = (props: Props) => {
  return (
    <>
      {props.tasks.map((task) => {
        return (
          <div
            key={task.id}
            className="card"
            onClick={() =>
              task.id === props.currentTask.id
                ? props.setCurrentTask(initialTask)
                : props.setCurrentTask(task)
            }
          >
            <Task
              title={task.title}
              updatedAtUTC={task.updatedAtUTC}
              iconName={task.iconName}
              iconColor={task.iconColor}
            />

            {task.id === props.currentTask.id ? (
              <>
                <button
                  className="edit"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    props.handleEditOnClick(task);
                  }}
                >
                  <Icon name="UIedit" color="#666" />
                </button>
                <button
                  className="delete"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    props.handleDeleteOnClick(task);
                  }}
                >
                  <Icon name="UIdelete" color="#666" />
                </button>
              </>
            ) : (
              <button
                className="done"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  props.done(task.id, Date.now());
                }}
              >
                <Icon name="UIdone" color="#33a974" />
              </button>
            )}
          </div>
        );
      })}
    </>
  );
};
