export interface InputHandlerInterface {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLElement>) => void;
}
