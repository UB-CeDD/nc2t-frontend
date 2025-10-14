import React, { createContext, useContext, useState, ReactNode } from "react";

interface Notification {
  id: string;
  message: string;
  type: "success" | "warning" | "error";
}

interface NotificationContextType {
  addNotification: (
    message: string,
    type: "success" | "warning" | "error",
  ) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

// Declare a global variable to hold the addNotification function
let globalAddNotification:
  | ((message: string, type: "success" | "warning" | "error") => void)
  | undefined;

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (
    message: string,
    type: "success" | "warning" | "error",
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newNotification: Notification = { id, message, type };
    setNotifications((prev) => [...prev, newNotification]);

    // Remove notification after a few seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  };

  // Register the addNotification function globally
  globalAddNotification = addNotification;

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded shadow-md text-white ${notification.type === "success" ? "bg-green-500" : notification.type === "warning" ? "bg-yellow-500" : "bg-red-500"}`}
          >
            {notification.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};

// Export a non-hook function to add notifications
export const notify = (
  message: string,
  type: "success" | "warning" | "error",
) => {
  if (globalAddNotification) {
    globalAddNotification(message, type);
  } else {
    console.warn(
      "NotificationProvider not yet mounted. Cannot display notification:",
      message,
    );
  }
};
