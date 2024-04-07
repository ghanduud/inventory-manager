import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import styled from 'styled-components';

const StyledAppLayout = styled.div`
	display: grid;
	grid-template-columns: 23rem 1fr; /* Adjust column width as needed */
	grid-template-rows: auto; /* Remove the second row */
	height: 100vh;
`;

const Main = styled.main`
	background-color: var(--color-grey-50);
	padding: 3rem 1.5rem 3rem;
	overflow: scroll;
	grid-column: 2; /* Adjust grid column */
`;

const Container = styled.div`
	max-width: 170rem;
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
