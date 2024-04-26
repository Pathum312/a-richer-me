import styles from './header.module.css';

const Header = () => {
	return (
		<div className={styles.container}>
			<div className={styles.logo}>
				<p className={styles.title}>ARM</p>
			</div>
			<div className={styles.tabs}>
				<div className={styles.tab}>
					<p>Dashboard</p>
				</div>
				<div className={styles.tab}>
					<p>Finance Table</p>
				</div>
			</div>
		</div>
	);
};

export default Header;
