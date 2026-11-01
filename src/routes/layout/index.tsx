import { Outlet } from 'react-router';

export const Layout = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        {/**
         * header
         */}
        <Outlet />
      </div>
    </>
  );
};
