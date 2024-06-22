import styles from './page.module.css';
import WidgetList from '@/components/Widget_List';
import CustomGraph from '@/components/Graph';
import GraphContainer from '@/components/Graph_Container';

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
			<GraphContainer>
				<CustomGraph type={'bar'} />
			</GraphContainer>
			<GraphContainer>
				<CustomGraph type={'pie'} />
			</GraphContainer>
		</div>
	);
};

export default Home;
