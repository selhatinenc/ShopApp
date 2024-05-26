import React from 'react';

function MessageManagement() {
  // Örnek mesajlar dizisi
  const messages = [
    {
      id: 1,
      sender: "John Doe",
      subject: "Meeting Reminder",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consequat, nunc ut efficitur feugiat, enim ipsum fermentum nulla, non bibendum ex lacus eget est. Ut consectetur mi id vestibulum malesuada.",
      date: "2024-05-04T12:30:00Z"
    },
    {
      id: 2,
      sender: "Alice Smith",
      subject: "Project Update",
      body: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed sit amet turpis ac dolor lacinia laoreet non ac ex. Nulla facilisi. Duis nec arcu id ipsum tincidunt iaculis.",
      date: "2024-05-03T09:15:00Z"
    },
    {
      id: 3,
      sender: "Bob Johnson",
      subject: "Request for Information",
      body: "Sed consequat magna nec ipsum cursus commodo. In hac habitasse platea dictumst. Nam tincidunt scelerisque fermentum. Vestibulum in dictum tortor.",
      date: "2024-05-02T17:45:00Z"
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Message Management</h2>
      <div className="space-y-4">
        {messages.map(message => (
          <div key={message.id} className="bg-gray-100 p-4 rounded-lg">
            <div className="font-semibold text-lg">{message.subject}</div>
            <div className="text-gray-600">{message.sender} - {new Date(message.date).toLocaleString()}</div>
            <div className="mt-2">{message.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MessageManagement;
