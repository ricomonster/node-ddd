/**
 * This is where the application will start.
 */
const App = ({ server }) => {
  return {
    start: () => {
      return (
        Promise.resolve()
          // start database here
          .then(server.start)
      );
    },
  };
};

module.exports = App;
