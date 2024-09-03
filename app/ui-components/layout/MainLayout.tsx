// react imports
import { ReactNode } from 'react';
// component imports
import SideBar from '@/app/ui-components/layout/SideBar';
import AppBar from '@/app/ui-components/layout/AppBar';

const MainLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className=' flex flex-col h-screen w-screen'>
			<AppBar />
			<div className='h-full grid grid-cols-8'>
				<SideBar />
				<main className='col-span-7 flex items-center justify-center px-1'>
					{children}
				</main>
			</div>
		</div>
	);
};

export default MainLayout;
