import styles from './graph_container.module.css';

const GraphContainer = ({ children }) => {
	return (
		<div className={styles.graph_container}>
			<div className={styles.graph}>{children}</div>
		</div>
	);
};

export default GraphContainer;
