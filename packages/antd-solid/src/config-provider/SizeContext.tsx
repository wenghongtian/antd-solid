import { Accessor, FlowComponent, createContext, createMemo, useContext } from 'solid-js';

export type SizeType = 'small' | 'middle' | 'large' | undefined;

const SizeContext = createContext<Accessor<SizeType>>(undefined);

export interface SizeContextProps {
  size?: SizeType;
}

export const SizeContextProvider: FlowComponent<SizeContextProps> = (props) => {
  const originSize = useContext(SizeContext);
  return (
    <SizeContext.Provider value={createMemo(() => props.size ?? originSize?.())}>
      {props.children}
    </SizeContext.Provider>
  );
};
