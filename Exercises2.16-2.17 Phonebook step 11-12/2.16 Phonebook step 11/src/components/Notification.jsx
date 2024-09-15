const Notification = ({ message, type }) => {
  if (message === null) {
    return null; // No notification to show
  }

  const notificationStyle = {
    color: type === 'success' ? 'green' : 'red', // Conditional styling based on type
    background: 'lightgrey',
    fontSize: 20,
    border: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  );
};

export default Notification;
