'use client';

import { Toaster } from 'react-hot-toast';

const ToasterProvider = () => {
    return (
        // If you import it directly in layout.tsx means it will throw an as you have rap with parent...
        <Toaster />
    );
};

export default ToasterProvider;
