import * as React from 'react';
import { TablePagination } from '@mui/base/TablePagination';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { Checkbox } from '@mui/material';
import styled, { createGlobalStyle } from 'styled-components';

// Global styles including CSS variables
const GlobalStyle = createGlobalStyle`
  :root {
    --border-color: grey;
    --text-color: #1c2025;
    --hover-background-color: #f3f6f9;
    --hover-border-color: #dae2ed;
    --focus-outline-color: #dae2ed;
    --focus-border-color: #3399ff;
  }
`;

// Styled components
const Root = styled.div`
  border-radius: 12px;
  border: 1px solid var(--border-color);
  overflow: clip;
  margin-left: 19%;
  margin-top: 20%;
  margin-bottom: 10%;
  width: 61%;
`;

const Filter = styled.div`
  position: relative;
  display: inline-flex;
  width: 60%;
  margin-top: 1%;
  margin-left: 40%;
  margin-bottom: 5px;
`;

const DeleteAllButton = styled.button`
  position: inherit;
  font-size: 0.7rem;
  margin-left: 28%;
  margin-right: 3%;
  width: 90px;
`;

const DeleteButton = styled.button`
  font-size: 0.7rem;
`;

const SmallCheckbox = styled(Checkbox)`
  transform: scale(0.9);
`;

const CustomTablePagination = styled(TablePagination)`

  .tablePagination-spacer {
    display: none;
  }

  .tablePagination-toolbar {
    position: inherit;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 4px 0;
    margin-left: 10px;
  }

  @media (min-width: 600px) {
    .tablePagination-toolbar {
      flex-direction: row;
      align-items: center;
    }
  }

  .tablePagination-selectLabel {
    margin: 0;
  }

  .tablePagination-select {
    position: inherit;
    margin-left: 10px;
    font-family: 'IBM Plex Sans', sans-serif;
    padding: 2px 0 2px 4px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    background-color: transparent;
    color: var(--text-color);
    transition: all 100ms ease;
  }

  .tablePagination-select:hover {
    background-color: var(--hover-background-color);
    border-color: var(--hover-border-color);
  }

  .tablePagination-select:focus {
    outline: 3px solid var(--focus-outline-color);
    border-color: var(--focus-border-color);
  }

  .tablePagination-displayedRows {
    margin: 0;
  }

  @media (min-width: 768px) {
    .tablePagination-displayedRows {
      margin-left: auto;
    }
  }

  .tablePagination-actions {
    display: flex;
    gap: 6px;
    border: transparent;
    text-align: center;
  }

  .tablePagination-actions > button {
    display: flex;
    align-items: center;
    padding: 0;
    border: transparent;
    border-radius: 50%;
    background-color: transparent;
    border: 1px solid var(--border-color);
    color: var(--text-color);
    transition: all 120ms ease;
  }

  .tablePagination-actions > button > svg {
    font-size: 22px;
  }

  .tablePagination-actions > button:hover {
    background-color: var(--hover-background-color);
    border-color: var(--hover-border-color);
  }

  .tablePagination-actions > button:focus {
    outline: 3px solid var(--focus-outline-color);
    border-color: var(--focus-border-color);
  }

  .tablePagination-actions > button:disabled {
    opacity: 0.3;
  }

  .tablePagination-actions > button:disabled:hover {
    border: 1px solid var(--border-color);
    background-color: transparent;
  }
`;

const Table = styled.table`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  border-collapse: collapse;
  border: none;
  width: 98%;
  margin: 10px;
`;

const TableCell = styled.td`
  border: 1px solid var(--border-color);
  text-align: left;
  padding: 8px;
`;

const TableHeaderCell = styled.th`
  border: 1px solid var(--border-color);
  text-align: left;
  padding: 8px;
`;

export default function MyList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const rowsData = [
    createData(1, "운동추천", "2024-07-03"),
    createData(2, "운동추천", "2024-07-03"),
    createData(3, "글내용", "2024-07-03"),
    createData(4, "글내용", "2024-07-03"),
    createData(5, "글내용", "2024-07-03"),
    createData(6, "글내용", "2024-07-03"),
    createData(7, "글내용", "2024-07-03"),
    createData(8, "글내용", "2024-07-04"),
    createData(9, "글내용", "2024-07-04"),
    createData(10, "글내용", "2024-07-04"),
    createData(11, "글내용", "2024-07-04"),
    createData(12, "글내용", "2024-07-04"),
    createData(13, "글내용", "2024-07-04"),
  ];

  const [rows, setRows] = React.useState(rowsData);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCheckboxChange = (event, number) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.number === number ? { ...row, checked: event.target.checked } : row
      )
    );
  };

  return (
    <>
      <GlobalStyle />
      <Root>
        <Filter>
          <li>작성글</li>
          <li>작성댓글</li>
          <DeleteAllButton className="deleteAll">전체삭제</DeleteAllButton>
          <DeleteButton className="delete">선택한 게시글 삭제</DeleteButton>
        </Filter>
        <Table aria-label="custom pagination table">
          <thead>
            <tr>
              <TableHeaderCell className="writeNum">글번호</TableHeaderCell>
              <TableHeaderCell className="title">제목</TableHeaderCell>
              <TableHeaderCell>날짜</TableHeaderCell>
              <TableHeaderCell>삭제관리</TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <tr key={row.number}>
                <TableCell>{row.number}</TableCell>
                <TableCell style={{ width: 120 }} align="right">
                  {row.title}
                </TableCell>
                <TableCell style={{ width: 120 }} align="right">
                  {row.date}
                </TableCell>
                <TableCell style={{ width: 120 }} align="center">
                  <SmallCheckbox
                    className="small-checkbox"
                    checked={row.checked}
                    onChange={(event) => handleCheckboxChange(event, row.number)}
                  />
                </TableCell>
              </tr>
            ))}

            {emptyRows > 0 && (
              <tr style={{ height: 34 * emptyRows }}>
                <TableCell colSpan={4} aria-hidden />
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <CustomTablePagination
                rowsPerPageOptions={[3, 10, 25, { label: 'All', value: -1 }]}
                colSpan={4}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    'aria-label': 'rows per page',
                  },
                  actions: {
                    showFirstButton: true,
                    showLastButton: true,
                    slots: {
                      firstPageIcon: FirstPageRoundedIcon,
                      lastPageIcon: LastPageRoundedIcon,
                      nextPageIcon: ChevronRightRoundedIcon,
                      backPageIcon: ChevronLeftRoundedIcon,
                    },
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className="customTablePagination"
              />
            </tr>
          </tfoot>
        </Table>
      </Root>
    </>
  );
}

function createData(number, title, date, checked = false) {
  return { number, title, date, checked };
}
