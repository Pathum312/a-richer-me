import styles from './widget.module.css';

const Widget = ({ title, value }) => {
	return (
		<div className={styles.container}>
			<p className={styles.title}>{title}</p>
			<p className={styles.value}>${value}</p>
		</div>
	);
};

export default Widget;
