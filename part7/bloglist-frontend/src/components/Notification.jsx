import React from 'react';
import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

const Notification = () => {
	const notification = useSelector((state) => state.notification);

	return notification ? (
		<Alert variant={notification.style}>{notification.message}</Alert>
	) : null;
};

export default Notification;
