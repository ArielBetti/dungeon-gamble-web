export const PATHS = {
  login: '/',
  register: '/register',
  dungeon: '/dungeon',
  arena: 'arena',
};

export const mountAuthRoute = (path: keyof typeof PATHS) => {
  return `${PATHS.dungeon}/${PATHS[path]}`;
};
