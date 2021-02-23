import PropTypes from "prop-types";

interface IPage {
  postsPerPage: number;
  totalPosts: number;
  paginate(data: number): number;
}

const PaginationComp = ({ postsPerPage, totalPosts, paginate }: IPage) => {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <span onClick={() => paginate(number)} className="page-link">
              {number}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

PaginationComp.propTypes = {
  postsPerPage: PropTypes.number,
  totalPosts: PropTypes.number,
  paginate: PropTypes.func,
};

export default PaginationComp;
