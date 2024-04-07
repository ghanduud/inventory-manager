import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineBuildingOffice, HiOutlineHome, HiOutlineTableCells } from 'react-icons/hi2';
import { LuFactory } from 'react-icons/lu';
import { GiMaterialsScience } from 'react-icons/gi';
import { BiCategoryAlt } from 'react-icons/bi';
import { IoMdResize } from 'react-icons/io';
import { FiType } from 'react-icons/fi';

const NavList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
	&:link,
	&:visited {
		display: flex;
		align-items: center;
		gap: 1.2rem;

		color: var(--color-grey-600);
		font-size: 1.6rem;
		font-weight: 500;
		padding: 1.2rem 2.4rem;
		transition: all 0.3s;
	}

	/* This works because react-router places the active class on the active NavLink */
	&:hover,
	&:active,
	&.active:link,
	&.active:visited {
		color: var(--color-grey-800);
		background-color: var(--color-grey-50);
		border-radius: var(--border-radius-sm);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}

	&:hover svg,
	&:active svg,
	&.active:link svg,
	&.active:visited svg {
		color: var(--color-brand-600);
	}
`;

function MainNav() {
	return (
		<nav>
			<NavList>
				<li>
					<StyledNavLink to='/dashboard'>
						<HiOutlineHome />
						<span>Home</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to='/items'>
						<HiOutlineTableCells />
						<span>Items</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to='/categories'>
						<BiCategoryAlt />
						<span>Categories</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to='/sizes'>
						<IoMdResize />
						<span>Sizes</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to='/types'>
						<FiType />
						<span>Types</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to='/inventories'>
						<HiOutlineBuildingOffice />
						<span>Inventories</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to='/manufactures'>
						<LuFactory />
						<span>Manufactures</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to='/materials'>
						<GiMaterialsScience />
						<span>Materials</span>
					</StyledNavLink>
				</li>
			</NavList>
		</nav>
	);
}

export default MainNav;
