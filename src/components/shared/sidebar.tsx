import { navItems } from '@/constants/data';
import DashboardNav from './dashboard-nav';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="hidden h-screen w-64 flex-col overflow-y-auto overflow-x-hidden rounded-tr-[90px] border-r bg-primary py-8 pl-5 dark:bg-background lg:flex">
      <Link to="/" className="text-3xl font-bold text-white">
        <img src="/Logo2.png" className="h-12" alt="MPC Logo" />
      </Link>
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <DashboardNav items={navItems} />
      </div>
    </aside>
  );
}
