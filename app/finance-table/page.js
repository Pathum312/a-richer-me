import styles from './page.module.css';
import Table from '@/components/Table';

export const metadata = {
	title: 'ARM | Finance Table',
	description: "ARM's Finance Table.",
};

const FinanceTable = () => {
	return (
		<div className={styles.container}>
			<Table />
		</div>
	);
};

export default FinanceTable;
