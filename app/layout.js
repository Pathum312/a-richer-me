import './globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import StoreProvider from './StoreProvider';

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<StoreProvider>
					<Header />
					{children}
					<Footer />
				</StoreProvider>
			</body>
		</html>
	);
}
