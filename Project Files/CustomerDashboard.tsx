import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useComplaint } from '../contexts/ComplaintContext';
import { 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  MessageSquare,
  FileText,
  Calendar,
  User,
  Phone,
  MapPin
} from 'lucide-react';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const { complaints } = useComplaint();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const userComplaints = complaints.filter(complaint => complaint.userId === user?.id);
  
  const filteredComplaints = userComplaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'assigned':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'in-progress':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
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

  const getStatusCounts = () => {
    return {
      total: userComplaints.length,
      pending: userComplaints.filter(c => c.status === 'pending').length,
      inProgress: userComplaints.filter(c => c.status === 'in-progress' || c.status === 'assigned').length,
      resolved: userComplaints.filter(c => c.status === 'resolved' || c.status === 'closed').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back, {user?.name}! Here's an overview of your complaints.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                <FileText className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{statusCounts.total}</p>
                <p className="text-sm text-gray-600">Total Complaints</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg">
                <Clock className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{statusCounts.pending}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-orange-100 text-orange-600 p-3 rounded-lg">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{statusCounts.inProgress}</p>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-green-100 text-green-600 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{statusCounts.resolved}</p>
                <p className="text-sm text-gray-600">Resolved</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-6">
          <Link
            to="/complaint/new"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Submit New Complaint
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search complaints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <Filter className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="assigned">Assigned</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Complaints List */}
        <div className="space-y-4">
          {filteredComplaints.length === 0 ? (
            <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-200 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No complaints found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Get started by submitting your first complaint'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Link
                  to="/complaint/new"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Submit New Complaint
                </Link>
              )}
            </div>
          ) : (
            filteredComplaints.map((complaint) => (
              <div key={complaint.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{complaint.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                        {getStatusIcon(complaint.status)}
                        <span className="ml-1 capitalize">{complaint.status.replace('-', ' ')}</span>
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                        {complaint.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{complaint.description}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {complaint.city}, {complaint.state}
                      </div>
                      {complaint.assignedAgentName && (
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          Agent: {complaint.assignedAgentName}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    Category: <span className="text-gray-900 font-medium">{complaint.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {complaint.assignedAgentId && (
                      <Link
                        to={`/complaint/${complaint.id}`}
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Chat with Agent
                      </Link>
                    )}
                    <Link
                      to={`/complaint/${complaint.id}`}
                      className="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}