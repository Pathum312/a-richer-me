import styles from './page.module.css';
import WidgetList from '@/components/Widget_List';

export const metadata = {
	title: 'ARM | Dashboard',
	description: 'The Dashboard for ARM.',
};

const Home = () => {
	return (
		<div className={styles.container}>
			<div className={styles.widgets}>
				<WidgetList />
			</div>
		</div>
	);
};

export default Home;
