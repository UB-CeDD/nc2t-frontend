import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-gray400 bg-opacity-50 z-50">
            <div className='block items-center justify-center'>
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            <p className='text-gray-700 flex justify-center mt-6'>Loading....</p>
            </div>
           
        </div>
    );
};

export default Loader;
