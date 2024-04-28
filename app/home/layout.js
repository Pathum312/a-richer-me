import Footer from '@/components/Footer';
import Header from '@/components/Header';

const HomeLayout = ({ children }) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
};

export default HomeLayout;
