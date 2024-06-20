import React, { ReactNode } from 'react';

type TSideSheetProps = {
  children: ReactNode;
};

const SideSheet = ({ children }: TSideSheetProps) => {
  return (
    <div className="bg-card/95 min-h-screen w-full md:max-w-[300px] border-r border-border">
      {children}
    </div>
  );
};

export default SideSheet;
