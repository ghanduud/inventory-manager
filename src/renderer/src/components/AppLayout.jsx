import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import styled from 'styled-components';

const StyledAppLayout = styled.div`
	display: grid;
	grid-template-columns: 26rem 1fr; /* Adjust column width as needed */
	grid-template-rows: auto; /* Remove the second row */
	height: 100vh;
`;

const Main = styled.main`
	background-color: var(--color-grey-50);
	padding: 4rem 4.8rem 6.4rem;
	overflow: scroll;
	grid-column: 2; /* Adjust grid column */
`;

const Container = styled.div`
	max-width: 160rem;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
`;

function AppLayout() {
	return (
		<StyledAppLayout>
			<Sidebar />
			<Main>
				<Container>
					<Outlet />
				</Container>
			</Main>
		</StyledAppLayout>
	);
}

export default AppLayout;
