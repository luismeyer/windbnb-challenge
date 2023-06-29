export function createState<T>(defaultValue: T) {
  let state: T = defaultValue;

  const listeners: Array<(state: T) => void> = [];

  function getState() {
    return state;
  }

  function setState(newState: Partial<T>) {
    const fullState = { ...state, ...newState };

    if (JSON.stringify(fullState) === JSON.stringify(state)) {
      return;
    }

    state = fullState;
    listeners.forEach((listener) => listener(fullState));
  }

  function subscribe(listener: (state: T) => void) {
    listeners.push(listener);
  }

  return {
    getState,
    setState,
    subscribe,
  };
}
