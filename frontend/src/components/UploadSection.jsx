import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { RefreshCw } from 'lucide-react';

function UploadSection({ onUploadAndEmbed, isLoading, error }) {
  const [file, setFile] = useState(null);
  const [textToEmbed, setTextToEmbed] = useState('');
  const [bits, setBits] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [action, setAction] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith('image/')) {
        setFile(droppedFile);
      }
    }
  };

  const handleBoxClick = () => {
    if (user && inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleSubmit = () => {
    if (file && (action === 'embed' ? textToEmbed && bits : true)) {
      onUploadAndEmbed(file, { textToEmbed, bits }, action);
      setSubmitted(true);
    }
  };

  const handleNavigateToLogin = () => {
    navigate('/auth');
  };

  const generateRandomBits = () => {
    const randomBits = Math.random().toString(2).substr(2, 16);
    setTextToEmbed(randomBits);
  };

  return (
    <div className="mt-16 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 uppercase">Upload Image for Watermarking</h2>

      <div
        className={`w-[54rem] h-[36rem] relative border-4 border-dashed rounded-2xl cursor-pointer transition-all duration-300 flex items-center justify-center ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white hover:bg-gray-50'
        } ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
        onDragOver={user ? handleDragOver : undefined}
        onDragLeave={user ? handleDragLeave : undefined}
        onDrop={user ? handleDrop : undefined}
        onClick={handleBoxClick}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={inputRef}
          className="hidden"
          disabled={!user}
        />

        {file ? (
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="max-w-[60%] max-h-[60%] opacity-50 blur-sm rounded-lg"
          />
        ) : (
          <p className="text-gray-500 text-center">
            {user ? '📁 Drag & Drop your image here OR Click to browse' : '🔒 Please login to upload images'}
          </p>
        )}
      </div>

      {user && (
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setAction('embed')}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow ${action === 'embed' ? 'ring-2 ring-blue-400' : ''}`}
          >
            Add Watermark
          </button>
          <button
            onClick={() => setAction('extract')}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow ${action === 'extract' ? 'ring-2 ring-blue-400' : ''}`}
          >
            Extract Watermark
          </button>
        </div>
      )}

      {action === 'embed' && (
        <>
          <input
            type="number"
            placeholder="Enter number of bits"
            value={bits}
            onChange={(e) => setBits(e.target.value)}
            disabled={!user}
            className="mt-6 w-96 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
          />

          <div className="mt-4 w-96 relative">
            <input
              type="text"
              placeholder="Enter bits or generate random"
              value={textToEmbed}
              onChange={(e) => setTextToEmbed(e.target.value)}
              disabled={!user}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
            />
            <button
              onClick={generateRandomBits}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-black"
            >
              <RefreshCw size={20} />
            </button>
          </div>
        </>
      )}

      {action && user && (
        <button
          onClick={handleSubmit}
          disabled={isLoading || !file || (action === 'embed' && (!textToEmbed || !bits))}
          className={`mt-4 w-[24rem] ${
            !isLoading && file && (action === 'extract' || (textToEmbed && bits)) ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
          } text-white font-semibold px-6 py-3 rounded-lg shadow disabled:opacity-50`}
        >
          {isLoading ? 'Processing...' : 'Submit'}
        </button>
      )}

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {/* Result Card */}
      {submitted && !isLoading && !error && (
        <div className="mt-8 p-6 border rounded-lg shadow w-[800px] bg-white ring-4 ring-blue-300 flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-4">Result</h3>
          {file && (
            <img src={URL.createObjectURL(file)} alt="Processed" className="mb-4 max-h-60" />
          )}
          {action === 'embed' ? (
            <p className="text-green-600 font-bold mb-4">Watermark Added</p>
          ) : (
            <div className="mb-4 p-4 border rounded-lg bg-gray-50 w-full text-center">
              <p className="font-medium">Bits Extracted:</p>
              <p className="break-all">{textToEmbed || 'Example extracted bits will appear here.'}</p>
            </div>
          )}
          <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow">
            Save Image
          </button>
        </div>
      )}
    </div>
  );
}

export default UploadSection;



            
