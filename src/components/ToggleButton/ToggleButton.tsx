type ToggleButtonProps = {
  state1: string;
  state2: string;
};

export const ToggleButton = ({ state1, state2 }: ToggleButtonProps) => {
  return (
    <button role="switch">
      <p>{state1}</p>
      <p>{state2}</p>
    </button>
  );
};
