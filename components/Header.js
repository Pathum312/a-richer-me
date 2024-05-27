'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './header.module.css';

const Header = () => {
	const tabs = [
		{ name: 'Dashboard', href: '/home' },
		{ name: 'Finance Table', href: '/finance-table' },
	];
	const [activeTab, setActiveTab] = useState('Dashboard');

	const tabChange = tab => {
		setActiveTab(tab);
	};

	return (
		<div className={styles.container}>
			<div className={styles.logo}>
				<p className={styles.title}>ARM</p>
			</div>
			<div className={styles.tabs}>
				{tabs.map(tab => (
					<Link
						key={tab.name}
						href={tab.href}
						className={`${styles.tab} ${
							tab.name === activeTab ? styles.active : ''
						}`}
						onClick={() => tabChange(tab.name)}
					>
						<p>{tab.name}</p>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Header;
