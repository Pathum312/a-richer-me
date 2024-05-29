import styles from './page.module.css';
import Widget from '@/components/Widget';

export const metadata = {
	title: 'ARM | Dashboard',
	description: 'The Dashboard for ARM.',
};

const Home = () => {
	return (
		<div className={styles.container}>
			<div className={styles.widgets}>
				<Widget title={'Current month'} value={1000} />
				<Widget title={'Previous month'} value={3450} />
				<Widget title={'Next month'} value={1700} />
				<Widget title={'Lifetime'} value={500000} />
			</div>
		</div>
	);
};

export default Home;
