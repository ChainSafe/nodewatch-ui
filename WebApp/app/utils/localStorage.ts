export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === undefined || serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    console.log('Error loading state from local storage');
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);

    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log('Error saving state to local storage');
  }
};
