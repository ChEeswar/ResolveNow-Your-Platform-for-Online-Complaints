import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useComplaint } from '../contexts/ComplaintContext';
import { 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  MessageSquare,
  FileText,
  Calendar,
  User,
  MapPin,
  ExternalLink,
  Users,
  TrendingUp,
  Activity
} from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { complaints, assignComplaint } = useComplaint();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Mock agents data
  const agents = [
    { id: '2', name: 'Sarah Wilson', email: 'sarah@resolvenow.com', assignedCount: 5 },
    { id: '3', name: 'Mike Johnson', email: 'mike@resolvenow.com', assignedCount: 3 },
    { id: '4', name: 'Lisa Chen', email: 'lisa@resolvenow.com', assignedCount: 4 }
  ];

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || complaint.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleAssignComplaint = (complaintId: string, agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (agent) {
      assignComplaint(complaintId, agentId, agent.name);
    }
  };

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

  const getOverallStats = () => {
    return {
      total: complaints.length,
      pending: complaints.filter(c => c.status === 'pending').length,
      assigned: complaints.filter(c => c.status === 'assigned').length,
      inProgress: complaints.filter(c => c.status === 'in-progress').length,
      resolved: complaints.filter(c => c.status === 'resolved' || c.status === 'closed').length,
      urgent: complaints.filter(c => c.priority === 'urgent').length
    };
  };

  const stats = getOverallStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back, {user?.name}! Monitor and manage all complaints across the platform.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                <FileText className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                <User className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.assigned}</p>
                <p className="text-sm text-gray-600">Assigned</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-orange-100 text-orange-600 p-3 rounded-lg">
                <Activity className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats.resolved}</p>
                <p className="text-sm text-gray-600">Resolved</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-red-100 text-red-600 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.urgent}</p>
                <p className="text-sm text-gray-600">Urgent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Overview */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Agent Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <div key={agent.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center font-medium">
                    {agent.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{agent.name}</p>
                    <p className="text-sm text-gray-500">{agent.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{agent.assignedCount}</p>
                  <p className="text-sm text-gray-500">Assigned</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search complaints, customers, or agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
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
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
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
              <p className="text-gray-600">
                Try adjusting your search or filters
              </p>
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
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        Customer: {complaint.userName}
                      </div>
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
                          <Users className="h-4 w-4 mr-1" />
                          Agent: {complaint.assignedAgentName}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500">
                      Category: <span className="text-gray-900 font-medium">{complaint.category}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: <span className="text-gray-900 font-mono">#{complaint.id}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {complaint.status === 'pending' && (
                      <select
                        onChange={(e) => e.target.value && handleAssignComplaint(complaint.id, e.target.value)}
                        className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        defaultValue=""
                      >
                        <option value="">Assign to Agent</option>
                        {agents.map(agent => (
                          <option key={agent.id} value={agent.id}>{agent.name}</option>
                        ))}
                      </select>
                    )}
                    <Link
                      to={`/complaint/${complaint.id}`}
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      View Chat
                    </Link>
                    <Link
                      to={`/complaint/${complaint.id}`}
                      className="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Details
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