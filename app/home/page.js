import styles from './page.module.css';
import WidgetList from '@/components/Widget_List';
import CustomGraph from '@/components/Graph';

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
			<div className={styles.graph_container}>
				<div className={styles.graph}>
					<CustomGraph />
				</div>
			</div>
		</div>
	);
};

export default Home;
