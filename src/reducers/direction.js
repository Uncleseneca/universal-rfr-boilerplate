export default (state = 'next', action = {}) => {
  if (!action.meta || !action.meta.location) {
    return state;
  }

  const { type } = action;
  const prevType = action.meta.location.prev.type;

  if (type === prevType) {
    return state;
  }

  if (!prevType && type === 'HOME') {
    return 'homeInitial';
  }

  if (type === 'HOME' && prevType === 'WORKS') {
    return 'back';
  } else if (type === 'WORKS' && prevType === 'HOME') {
    return 'next';
  }

  return state;
};
