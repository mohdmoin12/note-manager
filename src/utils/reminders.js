export function scheduleReminder(task, callback) {
    const now = new Date().getTime();
    const reminderTime = new Date(task.reminderTime).getTime();
    const delay = reminderTime - now;
  
    if (delay > 0) {
      setTimeout(() => {
        callback(task);
      }, delay);
    }
  }
  