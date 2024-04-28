import styles from './page.module.css';

export const metadata = {
	title: 'ARM | Dashboard',
	description: 'The Dashboard for ARM.',
};

const Home = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Dashboard Page</h1>
			<p className={styles.description}>The dashboard, shows the stats and graphs for the user</p>
		</div>
	);
};

export default Home;
