import styles from './page.module.css';
import TableContainer from '@/components/Table_Container';

export const metadata = {
	title: 'ARM | Finance Table',
	description: "ARM's Finance Table.",
};

const FinanceTable = () => {
	return (
		<div className={styles.container}>
			<TableContainer />
		</div>
	);
};

export default FinanceTable;
