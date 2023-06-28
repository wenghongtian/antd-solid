import { Accessor, FlowComponent, createContext, createMemo, useContext } from 'solid-js';

export type DisabledType = true | false | undefined;

const DisabledContext = createContext<Accessor<DisabledType>>(createMemo(() => false));

export interface DisabledContextProps {
  disabled?: DisabledType;
}

export const DisabledContextProvider: FlowComponent<DisabledContextProps> = (props) => {
  const originDisabled = useContext(DisabledContext);
  return (
    <DisabledContext.Provider value={createMemo(() => props.disabled ?? originDisabled())}>
      {props.children}
    </DisabledContext.Provider>
  );
};

export default DisabledContext;
