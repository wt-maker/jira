import { useUndo } from "utils/use-undo";
const Test = () => {
  const initailPresent = 1;
  const [
    { past, future, present },
    { undo, redo, set, reset, canUndo, canRedo },
  ] = useUndo(initailPresent);
  console.log("past----------", past);
  console.log("future--------", future);
  return (
    <div>
      <div>You clicked {present} times</div>
      <button onClick={() => set(Number(present) + 1)}>+</button>
      <button onClick={() => set(Number(present) - 1)}>-</button>
      <button onClick={undo} disabled={!canUndo}>
        undo
      </button>
      <button onClick={redo} disabled={!canRedo}>
        redo
      </button>
      <button onClick={() => reset(initailPresent)}>reset to 0</button>
    </div>
  );
};

export default Test;
