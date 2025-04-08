import { useState } from 'react';
import { Share2, Link, Mail, Copy, Check, Users, Lock, Globe, User, Plus, X } from 'lucide-react';

export default function Share() {
  // Sample data for demo purposes
  const [documents, setDocuments] = useState([
    { id: 1, type: 'note', title: 'Project Ideas', shared: true, access: 'view', sharedWith: ['user@example.com'] },
    { id: 2, type: 'task', title: 'Weekly Tasks', shared: false, access: 'none', sharedWith: [] },
    { id: 3, type: 'note', title: 'Meeting Notes', shared: true, access: 'edit', sharedWith: ['colleague@example.com', 'team@example.com'] },
    { id: 4, type: 'task', title: 'Personal Goals', shared: false, access: 'none', sharedWith: [] }
  ]);
  
  const [currentDoc, setCurrentDoc] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const [shareAccess, setShareAccess] = useState('view');
  const [linkCopied, setLinkCopied] = useState(false);
  const [shareFilter, setShareFilter] = useState('all'); // 'all', 'shared', 'private'
  
  // Open share modal for a document
  const openShareModal = (doc) => {
    setCurrentDoc(doc);
    setShowShareModal(true);
  };
  
  // Close share modal
  const closeShareModal = () => {
    setShowShareModal(false);
    setCurrentDoc(null);
    setShareEmail('');
    setLinkCopied(false);
  };
  
  // Add a new email to share list
  const addShareEmail = () => {
    if (!shareEmail || !shareEmail.includes('@') || !currentDoc) return;
    
    const updated = documents.map(doc => {
      if (doc.id === currentDoc.id) {
        // Avoid duplicates
        if (!doc.sharedWith.includes(shareEmail)) {
          return {
            ...doc,
            shared: true,
            access: shareAccess,
            sharedWith: [...doc.sharedWith, shareEmail]
          };
        }
      }
      return doc;
    });
    
    setDocuments(updated);
    setShareEmail('');
    
    // Update current doc reference
    setCurrentDoc(updated.find(doc => doc.id === currentDoc.id));
  };
  
  // Remove a person from share list
  const removeSharedPerson = (docId, email) => {
    const updated = documents.map(doc => {
      if (doc.id === docId) {
        const newSharedWith = doc.sharedWith.filter(e => e !== email);
        return {
          ...doc,
          shared: newSharedWith.length > 0,
          sharedWith: newSharedWith,
          access: newSharedWith.length > 0 ? doc.access : 'none'
        };
      }
      return doc;
    });
    
    setDocuments(updated);
    
    // Update current doc reference if modal is open
    if (currentDoc && currentDoc.id === docId) {
      setCurrentDoc(updated.find(doc => doc.id === docId));
    }
  };
  
  // Copy share link
  const copyShareLink = () => {
    // In a real app, this would be a unique link
    const fakeShareLink = `https://yourapp.com/share/${currentDoc.id}`;
    navigator.clipboard.writeText(fakeShareLink)
      .then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      });
  };
  
  // Update access level for a document
  const updateAccessLevel = (newAccess) => {
    if (!currentDoc) return;
    
    const updated = documents.map(doc => {
      if (doc.id === currentDoc.id) {
        return {
          ...doc,
          access: newAccess
        };
      }
      return doc;
    });
    
    setDocuments(updated);
    setShareAccess(newAccess);
    
    // Update current doc reference
    setCurrentDoc(updated.find(doc => doc.id === currentDoc.id));
  };
  
  // Filter documents based on share status
  const filteredDocuments = documents.filter(doc => {
    if (shareFilter === 'all') return true;
    if (shareFilter === 'shared') return doc.shared;
    if (shareFilter === 'private') return !doc.shared;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Share2 className="mr-2" />
          Share Documents
        </h1>
      </div>
      
      {/* Filter tabs */}
      <div className="flex border-b mb-6">
        <button 
          className={`px-4 py-2 ${shareFilter === 'all' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setShareFilter('all')}
        >
          All Documents
        </button>
        <button 
          className={`px-4 py-2 ${shareFilter === 'shared' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setShareFilter('shared')}
        >
          Shared
        </button>
        <button 
          className={`px-4 py-2 ${shareFilter === 'private' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setShareFilter('private')}
        >
          Private
        </button>
      </div>
      
      {/* Document list */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <h2 className="text-lg font-semibold">Your Documents</h2>
          <p className="text-sm text-gray-500">Share your notes and tasks with others</p>
        </div>
        
        {filteredDocuments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No documents found.
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredDocuments.map(doc => (
              <li key={doc.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${doc.type === 'note' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                      {doc.type === 'note' ? 'N' : 'T'}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">{doc.title}</h3>
                      <div className="flex items-center mt-1">
                        {doc.shared ? (
                          <div className="flex items-center text-sm text-gray-500">
                            <Users size={14} className="mr-1" />
                            <span>Shared with {doc.sharedWith.length} {doc.sharedWith.length === 1 ? 'person' : 'people'}</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-sm text-gray-500">
                            <Lock size={14} className="mr-1" />
                            <span>Private</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => openShareModal(doc)}
                    className={`px-4 py-2 rounded-md ${doc.shared ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                  >
                    <span className="flex items-center">
                      <Share2 size={16} className="mr-1" />
                      {doc.shared ? 'Manage' : 'Share'}
                    </span>
                  </button>
                </div>
                
                {/* Show shared users if any */}
                {doc.shared && doc.sharedWith.length > 0 && (
                  <div className="mt-3 ml-13">
                    <div className="flex flex-wrap gap-2 ml-10 mt-2">
                      {doc.sharedWith.map((email, idx) => (
                        <div key={idx} className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                          <User size={14} className="mr-1" />
                          <span className="mr-2">{email}</span>
                          <button 
                            onClick={() => removeSharedPerson(doc.id, email)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Share Modal */}
      {showShareModal && currentDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Share "{currentDoc.title}"</h2>
                <button onClick={closeShareModal} className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>
              
              {/* Share settings */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Access Level</label>
                <div className="flex border rounded-md overflow-hidden">
                  <button
                    className={`flex-1 py-2 ${currentDoc.access === 'view' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                    onClick={() => updateAccessLevel('view')}
                  >
                    View Only
                  </button>
                  <button
                    className={`flex-1 py-2 ${currentDoc.access === 'edit' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                    onClick={() => updateAccessLevel('edit')}
                  >
                    Can Edit
                  </button>
                </div>
              </div>
              
              {/* Share via link */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Link size={16} className="mr-2 text-gray-600" />
                    <span className="font-medium">Share via link</span>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={copyShareLink}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      {linkCopied ? <Check size={16} className="mr-1" /> : <Copy size={16} className="mr-1" />}
                      {linkCopied ? 'Copied!' : 'Copy Link'}
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Anyone with the link can {currentDoc.access === 'view' ? 'view' : 'edit'} this document
                </p>
              </div>
              
              {/* Share via email */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Share with people
                </label>
                <div className="flex items-center">
                  <div className="flex-1 mr-2">
                    <input
                      type="email"
                      placeholder="Email address"
                      value={shareEmail}
                      onChange={(e) => setShareEmail(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <button
                    onClick={addShareEmail}
                    disabled={!shareEmail || !shareEmail.includes('@')}
                    className={`p-2 rounded-md ${!shareEmail || !shareEmail.includes('@') ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white'}`}
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
              
              {/* List of shared people */}
              {currentDoc.sharedWith.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">People with access</h3>
                  <ul className="space-y-2 max-h-40 overflow-y-auto">
                    {currentDoc.sharedWith.map((email, idx) => (
                      <li key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                        <div className="flex items-center">
                          <User size={16} className="mr-2 text-gray-600" />
                          <span>{email}</span>
                        </div>
                        <button
                          onClick={() => removeSharedPerson(currentDoc.id, email)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="bg-gray-50 px-6 py-3 flex justify-end rounded-b-lg">
              <button
                onClick={closeShareModal}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Features explanation */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Mail className="text-blue-600 mr-2" />
            <h3 className="font-medium">Email Sharing</h3>
          </div>
          <p className="text-sm text-gray-600">
            Share your notes and tasks directly with collaborators via email invitations.
          </p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Link className="text-green-600 mr-2" />
            <h3 className="font-medium">Link Sharing</h3>
          </div>
          <p className="text-sm text-gray-600">
            Create shareable links to quickly distribute your documents to anyone.
          </p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Lock className="text-purple-600 mr-2" />
            <h3 className="font-medium">Permission Control</h3>
          </div>
          <p className="text-sm text-gray-600">
            Set view-only or editing permissions to control how others interact with your content.
          </p>
        </div>
      </div>
    </div>
  );
}