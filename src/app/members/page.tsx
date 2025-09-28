import React from 'react';
import CouncilPage from '@/components/Members';
const MembersPage: React.FC = () => {
    return (
        <div>
            <h1 className=''>Members Page</h1>
            <p>Welcome to the members area!</p>
            {/* Add more member-related components or content here */}
            <CouncilPage />
        </div>
    );
};

export default MembersPage;