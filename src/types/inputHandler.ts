export interface InputHandlerInterface {
  value: string | number;
  onChange: (e: { target: { value: string | number } }) => void;
}
