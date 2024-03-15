import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import GlobalStyles from './styles/GlobalStyles';
import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import Items from './pages/Items';

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
			<BrowserRouter>
				<Routes>
					<Route element={<AppLayout />}>
						<Route index element={<Navigate replace to='dashboard' />} />
						<Route path='dashboard' element={<Dashboard />} />
						<Route path='items' element={<Items />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
