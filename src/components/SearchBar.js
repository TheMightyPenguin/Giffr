import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { searchGifsChangeQuery } from '../actions/search';

const StyledTopBar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 70px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.searchBar};
  box-shadow: 0px 10px 40px -15px rgba(0,0,0,0.75);
  z-index: ${({ theme }) => theme.zMap.searchBar};
`;

const StyledTopBarContent = styled.div`
  margin: 0 auto;
  max-width: 1024px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLogo = styled.p`
  font-family: 'Pacifico', cursive;
  font-size: 2rem;
  text-shadow: -1px 0px 2px rgba(20, 20, 20, 1);
  color: ${({ theme }) => theme.colors.text};
`;

const StyledSearchInput = styled.input`
  border: 5px solid ${({ theme }) => theme.colors.background};
  border-radius: 6px;
`;

const StyledLink = styled(NavLink)`
  cursor: pointer;
`;

const StyledLogoContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${StyledLink} {
    margin-left: 30px;
  }
`;

const SearchBar = ({ query, searchGifsChangeQuery }) => (
  <StyledTopBar>
    <StyledTopBarContent>
      <StyledLogoContainer>
        <StyledLogo>Giffr</StyledLogo>
        <StyledLink to="/">🏠</StyledLink>
      </StyledLogoContainer>
      <StyledSearchInput
        placeholder="search gifs"
        type="text"
        value={query}
        onChange={event => searchGifsChangeQuery(event.target.value)}
      />
    </StyledTopBarContent>
  </StyledTopBar>
);

const mapStateToProps = ({ search }) => ({
  query: search.query
});

const mapDispatchToProps = {
  searchGifsChangeQuery
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
