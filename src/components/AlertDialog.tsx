type Props = {
  currentTask: Task;
  deleteTask: (id: number) => void;
  setAlertOpen: (flag: boolean) => void;
};

export const AlertDialog = (props: Props) => {
  return (
    <>
      <div className="overlay" onClick={() => props.setAlertOpen(false)}></div>
      <div className="alert-dialog">
        <p>
          「{props.currentTask.title}
          」を削除しますか？
          <br />
          削除したタスクは元に戻せません
        </p>
        <button
          className="destruction"
          type="button"
          onClick={() => props.deleteTask(props.currentTask.id)}
        >
          削除する
        </button>
        <button
          className="cancel"
          type="button"
          onClick={() => props.setAlertOpen(false)}
        >
          キャンセル
        </button>
      </div>
    </>
  );
};
