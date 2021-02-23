import PropTypes from "prop-types";
import React from "react";
import { Loader } from "rsuite";
import styled from "styled-components";

interface IPage {
  onSearch(str: string): void;
  loading: boolean;
}

const SearchReportComp = ({ onSearch, loading }: IPage): JSX.Element => {
  return (
    <Wrapper>
      <input
        type="search"
        name="reports-search-input"
        className="form-control"
        placeholder="Search reports"
        onChange={(e) => onSearch(e.target.value)}
      />
      {loading ? <Loader /> : <i className="fas fa-search c-hand"></i>}
    </Wrapper>
  );
};

SearchReportComp.propTypes = {
  isLoading: PropTypes.func,
  getResults: PropTypes.func,
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 768px;
  margin: 4rem auto;

  input {
    margin-right: 1rem;
  }
  .fa-search {
    font-size: 1.5rem;
  }
`;

export default SearchReportComp;
