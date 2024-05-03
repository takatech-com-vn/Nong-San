// ValidationContext.tsx
import React from 'react';

interface ValidationContextProps {
  validate: () => boolean;
}

// Tạo một context với giá trị mặc định
const ValidationContext = React.createContext<ValidationContextProps>({ validate: () => true });

export default ValidationContext;
