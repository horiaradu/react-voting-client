export default socket => store => next => action => {
  console.log(action.meta);
  if (action.meta && action.meta.remote) {
    const clientId = store.getState().get('clientId');
    const x = Object.assign({}, action, {voterId: clientId});
    console.log(x);

    socket.emit('action', Object.assign({}, action, {voterId: clientId}));
  }

  return next(action);
}