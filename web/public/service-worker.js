self.addEventListener('push', function(event) {
  event.waitUntil(
    self.registration.pushManager.getSubscription({ userVisibleOnly: true }).then(function(subscription) {
      return fetch('/push_notification_receipts', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ pushNotificationReceipt: { subscriptionEndpoint: subscription.endpoint }})
      });
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var pushNotification = data.push_notifications[0];

      self.registration.showNotification(pushNotification.title, {
        icon: pushNotification.icon,
        body: pushNotification.body,
        data: {
          targetPath: pushNotification.target_path
        }
      });
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  event.preventDefault(); // prevents new tabs from not opening in foreground
  var notification = event.notification;

  if (clients.openWindow) {
    clients.openWindow(notification.data.targetPath);
  }
  
  notification.close();
});
