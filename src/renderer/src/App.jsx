import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Route, Routes, Navigate, HashRouter } from 'react-router-dom';

import GlobalStyles from './styles/GlobalStyles';
import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import Items from './pages/Items';
import { Toaster } from 'react-hot-toast';
import Inventories from './pages/Inventories';
import Manufactures from './pages/Manufactures';
import Materials from './pages/Materials';
import Categories from './pages/Categories';
import Sizes from './pages/Sizes';
import Types from './pages/Types';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<GlobalStyles />
			<HashRouter>
				<Routes>
					<Route element={<AppLayout />}>
						<Route index element={<Navigate replace to='dashboard' />} />
						<Route path='dashboard' element={<Dashboard />} />
						<Route path='items' element={<Items />} />
						<Route path='categories' element={<Categories />} />
						<Route path='sizes' element={<Sizes />} />
						<Route path='types' element={<Types />} />
						<Route path='inventories' element={<Inventories />} />
						<Route path='manufactures' element={<Manufactures />} />
						<Route path='materials' element={<Materials />} />
					</Route>
				</Routes>
			</HashRouter>
			<Toaster
				position='top-center'
				gutter={12}
				containerStyle={{ margin: '8px' }}
				toastOptions={{
					success: {
						duration: 3000,
					},
					error: {
						duration: 5000,
					},
					style: {
						fontSize: '16px',
						maxWidth: '500px',
						padding: '16px 24px',
						backgroundColor: 'var(--color-grey-0)',
						color: 'var(--color-grey-700)',
					},
				}}
			/>
		</QueryClientProvider>
	);
}

export default App;
