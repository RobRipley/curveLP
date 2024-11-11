import React, { useState } from 'react';
import DataDisplay from './components/DataDisplay';

function App() {
    const [poolAddress, setPoolAddress] = useState('');
    const [poolData, setPoolData] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        if (!poolAddress.trim()) {
            setError('Please enter a pool address');
            return;
        }
        setError('');
        setPoolData(null);
        setIsLoading(true);
        try {
            const encodedAddress = encodeURIComponent(poolAddress.trim().toLowerCase());
            const response = await fetch(`/api/get-pool-info?address=${encodedAddress}`);
            const data = await response.json();
            if (response.ok) {
                setPoolData(data);
            } else {
                throw new Error(data.error || 'Failed to fetch pool data');
            }
        } catch (err) {
            setError(`Error fetching data: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                    Curve Pool Data Viewer
                </h1>
                
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <input
                            type="text"
                            value={poolAddress}
                            onChange={(e) => setPoolAddress(e.target.value)}
                            placeholder="Enter Pool Address"
                            className="flex-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button 
                            onClick={fetchData}
                            disabled={isLoading}
                            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition duration-150 ease-in-out shadow-sm"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Loading...
                                </span>
                            ) : (
                                'Fetch Pool Data'
                            )}
                        </button>
                    </div>

                    {error && (
                        <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-700 rounded-md">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Example pool addresses for testing */}
                    <div className="mt-4 text-sm text-gray-600">
                        <p className="font-medium mb-2">Example pool addresses:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>0x4e43fec6a71577fdb439c42a2c3a5d8d9dc69b78</li>
                            <li>0x960ea3e3c7fb317332d990873d354e18d7645590</li>
                            <li>0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7</li>
                        </ul>
                    </div>
                </div>
                
                {poolData && (
                    <div className="bg-white rounded-lg shadow">
                        <DataDisplay poolData={poolData} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;