import Header from '@/components/Header';

const HomeLayout = ({ children }) => {
	return (
		<>
			<Header />
			{children}
		</>
	);
};

export default HomeLayout;
