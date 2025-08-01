import React from 'react';
import SideNavigation from '../_components/SideNavigation';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='grid grid-cols-[16rem_1fr] gap-12 h-full'>
      <SideNavigation />
      <div className='py-1'>{children}</div>
    </div>
  );
}
