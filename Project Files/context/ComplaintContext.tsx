import React, { createContext, useContext, useState } from 'react';

export interface Complaint {
  id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'assigned' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  assignedAgentId?: string;
  assignedAgentName?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  attachments?: string[];
}

interface Message {
  id: string;
  complaintId: string;
  senderId: string;
  senderName: string;
  senderType: 'customer' | 'agent' | 'admin';
  message: string;
  timestamp: string;
}

interface ComplaintContextType {
  complaints: Complaint[];
  messages: Message[];
  createComplaint: (complaintData: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  updateComplaintStatus: (id: string, status: Complaint['status']) => void;
  assignComplaint: (complaintId: string, agentId: string, agentName: string) => void;
  sendMessage: (complaintId: string, senderId: string, senderName: string, senderType: 'customer' | 'agent' | 'admin', message: string) => void;
  getComplaintMessages: (complaintId: string) => Message[];
}

const ComplaintContext = createContext<ComplaintContextType | undefined>(undefined);

export function useComplaint() {
  const context = useContext(ComplaintContext);
  if (context === undefined) {
    throw new Error('useComplaint must be used within a ComplaintProvider');
  }
  return context;
}

export function ComplaintProvider({ children }: { children: React.ReactNode }) {
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: '1',
      userId: '1',
      userName: 'John Doe',
      title: 'Defective Product Received',
      description: 'I received a damaged smartphone with a cracked screen. The package was properly sealed, but the product inside was defective.',
      category: 'Product Quality',
      priority: 'high',
      status: 'assigned',
      createdAt: '2025-01-21T10:30:00Z',
      updatedAt: '2025-01-21T14:15:00Z',
      assignedAgentId: '2',
      assignedAgentName: 'Sarah Wilson',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      pincode: '10001',
      phone: '+1234567890'
    },
    {
      id: '2',
      userId: '3',
      userName: 'Mike Johnson',
      title: 'Poor Customer Service Experience',
      description: 'The customer service representative was rude and unhelpful when I called regarding my order delay.',
      category: 'Customer Service',
      priority: 'medium',
      status: 'pending',
      createdAt: '2025-01-21T09:15:00Z',
      updatedAt: '2025-01-21T09:15:00Z',
      address: '456 Oak Avenue',
      city: 'Los Angeles',
      state: 'CA',
      pincode: '90210',
      phone: '+1987654321'
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      complaintId: '1',
      senderId: '1',
      senderName: 'John Doe',
      senderType: 'customer',
      message: 'Hello, I need help with my defective product.',
      timestamp: '2025-01-21T14:30:00Z'
    },
    {
      id: '2',
      complaintId: '1',
      senderId: '2',
      senderName: 'Sarah Wilson',
      senderType: 'agent',
      message: 'Hi John, I understand your concern. Can you please provide more details about the damage?',
      timestamp: '2025-01-21T14:35:00Z'
    }
  ]);

  const createComplaint = (complaintData: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const newComplaint: Complaint = {
      ...complaintData,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setComplaints(prev => [...prev, newComplaint]);
  };

  const updateComplaintStatus = (id: string, status: Complaint['status']) => {
    setComplaints(prev => 
      prev.map(complaint => 
        complaint.id === id 
          ? { ...complaint, status, updatedAt: new Date().toISOString() }
          : complaint
      )
    );
  };

  const assignComplaint = (complaintId: string, agentId: string, agentName: string) => {
    setComplaints(prev => 
      prev.map(complaint => 
        complaint.id === complaintId 
          ? { 
              ...complaint, 
              assignedAgentId: agentId, 
              assignedAgentName: agentName, 
              status: 'assigned',
              updatedAt: new Date().toISOString() 
            }
          : complaint
      )
    );
  };

  const sendMessage = (complaintId: string, senderId: string, senderName: string, senderType: 'customer' | 'agent' | 'admin', message: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      complaintId,
      senderId,
      senderName,
      senderType,
      message,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  const getComplaintMessages = (complaintId: string) => {
    return messages.filter(message => message.complaintId === complaintId);
  };

  const value = {
    complaints,
    messages,
    createComplaint,
    updateComplaintStatus,
    assignComplaint,
    sendMessage,
    getComplaintMessages
  };

  return (
    <ComplaintContext.Provider value={value}>
      {children}
    </ComplaintContext.Provider>
  );
}