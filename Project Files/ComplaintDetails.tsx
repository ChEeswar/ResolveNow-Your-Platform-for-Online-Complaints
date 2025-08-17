import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useComplaint } from '../contexts/ComplaintContext';
import { 
  ArrowLeft,
  Calendar, 
  User, 
  MapPin, 
  Phone,
  Tag,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Paperclip,
  Download
} from 'lucide-react';

export default function ComplaintDetails() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { complaints, sendMessage, getComplaintMessages } = useComplaint();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');

  const complaint = complaints.find(c => c.id === id);
  const messages = getComplaintMessages(id || '');

  if (!complaint) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Complaint Not Found</h2>
          <p className="text-gray-600 mb-4">The complaint you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'assigned':
        return <User className="h-5 w-5 text-blue-500" />;
      case 'in-progress':
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-orange-100 text-orange-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    sendMessage(
      complaint.id,
      user.id,
      user.name,
      user.userType,
      newMessage.trim()
    );
    
    setNewMessage('');
  };

  const canSendMessages = user?.userType === 'agent' || 
    (user?.userType === 'customer' && complaint.userId === user.id) ||
    user?.userType === 'admin';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{complaint.title}</h1>
              <p className="text-gray-600 mt-1">Complaint ID: #{complaint.id}</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complaint.status)}`}>
                {getStatusIcon(complaint.status)}
                <span className="ml-1 capitalize">{complaint.status.replace('-', ' ')}</span>
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(complaint.priority)}`}>
                {complaint.priority.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Complaint Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Complaint Details</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                  <p className="text-gray-900">{complaint.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Tag className="h-4 w-4 mr-2" />
                    <span className="font-medium">Category:</span>
                    <span className="ml-1">{complaint.category}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="font-medium">Created:</span>
                    <span className="ml-1">{formatDate(complaint.createdAt)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    <span className="font-medium">Customer:</span>
                    <span className="ml-1">{complaint.userName}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="font-medium">Phone:</span>
                    <span className="ml-1">{complaint.phone}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-start text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                    <div>
                      <span className="font-medium">Address:</span>
                      <p className="mt-1">
                        {complaint.address}<br />
                        {complaint.city}, {complaint.state} - {complaint.pincode}
                      </p>
                    </div>
                  </div>
                </div>

                {complaint.attachments && complaint.attachments.length > 0 && (
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Attachments</h3>
                    <div className="space-y-2">
                      {complaint.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                          <div className="flex items-center">
                            <Paperclip className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">Attachment {index + 1}</span>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Communication</h2>
              </div>
              
              <div className="p-6">
                {messages.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No messages yet. Start a conversation!</p>
                  </div>
                ) : (
                  <div className="space-y-4 mb-6">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.senderId === user?.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <div className={`flex items-center justify-between mt-2 text-xs ${
                            message.senderId === user?.id ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            <span>{message.senderName} ({message.senderType})</span>
                            <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {canSendMessages && (
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Status Information</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Current Status:</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                    {complaint.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Priority:</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                    {complaint.priority.toUpperCase()}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Created:</span>
                  <span className="text-sm text-gray-900">
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Updated:</span>
                  <span className="text-sm text-gray-900">
                    {new Date(complaint.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                {complaint.assignedAgentName && (
                  <div className="pt-3 border-t">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Assigned Agent:</span>
                      <span className="text-sm text-gray-900 font-medium">
                        {complaint.assignedAgentName}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {user?.userType === 'customer' && complaint.userId === user?.id && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-900 mb-2">Need Help?</h4>
                <p className="text-sm text-blue-700 mb-3">
                  If you have any questions or need immediate assistance, you can contact our support team.
                </p>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Contact Support →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}