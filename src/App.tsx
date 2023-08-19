import React, { useState, useEffect } from 'react';
import localforage from 'localforage';

import { Header } from './components/Header';
import { EditDialog } from './components/EditDialog';
import { Card } from './components/Card';
import { AlertDialog } from './components/AlertDialog';

import { initialTask } from './components/Task';

import '/src/index.css';

export const App = () => {
  const [currentTask, setCurrentTask] = useState<Task>(initialTask);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editOpen, setEditOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  // Headerの＋ボタンを押したときに呼ばれる
  // tasks配列に新しいtaskを追加する
  const createTask = () => {
    const newTask: Task = {
      title: '',
      updatedAtUTC: new Date().getTime(),
      id: new Date().getTime(),
      iconName: 'No Image',
      iconColor: '#000',
    };

    setTasks((tasks) => [newTask, ...tasks]);
    setCurrentTask(newTask);
    setEditOpen(true);
  };

  // EditDialogを閉じたときに呼ばれる
  // taskの名称、アイコン、アイコンの色を変更する
  const updateTask = (
    id: number,
    title: string,
    iconName: string,
    iconColor: string
  ) => {
    setTasks((tasks) => {
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, iconName, iconColor };
        }
        return task;
      });

      return newTasks;
    });
    setCurrentTask(() => initialTask);
    setEditOpen(false);
  };

  // Cardのチェックボタンがクリックされたときに呼ばれる
  // 最終実施日を現在日付で更新する
  const done = (id: number, updatedAtUTC: number) => {
    setTasks((tasks) => {
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, updatedAtUTC };
        }
        return task;
      });

      return newTasks;
    });
  };

  // AlertDialogで削除するボタンがクリックされたときに呼ばれる
  // tasks配列からidに一致するtaskを削除する
  const deleteTask = (id: number) => {
    setTasks((tasks) => tasks.filter((task) => task.id != id));
    setCurrentTask(() => initialTask);
    setAlertOpen(false);
  };

  // Cardで編集ボタンがクリックされたときに呼ばれる
  // そのCardのTaskをcurrentTaskにセットする
  const handleEditOnClick = (currentTask: Task) => {
    setCurrentTask(currentTask);
    setEditOpen(true);
  };

  // Cardで削除ボタンがクリックされたときに呼ばれる
  // AlertDialogを表示する
  const handleDeleteOnClick = (currentTask: Task) => {
    setCurrentTask(currentTask);
    setAlertOpen(true);
  };

  useEffect(() => {
    localforage
      .getItem('tasks-20230818')
      .then((values) => setTasks(values as Task[]));
  }, []);

  useEffect(() => {
    localforage.setItem('tasks-20230818', tasks);
  }, [tasks]);

  return (
    <>
      <Header createTask={createTask} />

      {editOpen ? (
        <EditDialog currentTask={currentTask} updateTask={updateTask} />
      ) : (
        <></>
      )}

      {alertOpen ? (
        <AlertDialog
          currentTask={currentTask}
          deleteTask={deleteTask}
          setAlertOpen={setAlertOpen}
        />
      ) : (
        <></>
      )}

      <Card
        tasks={tasks}
        currentTask={currentTask}
        done={done}
        setCurrentTask={setCurrentTask}
        handleEditOnClick={handleEditOnClick}
        handleDeleteOnClick={handleDeleteOnClick}
      />
    </>
  );
};
