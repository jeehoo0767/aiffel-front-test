import styled from 'styled-components';

export const StyledTable = styled.table`
  caption-side: top;
  border: none;
  border-collapse: collapse;
  /* border-collapse: separate; */
  /* border-spacing: 5px 10px; */

  caption-side: bottom;
  /* empty-cell: show | hide;  */
  /* empty-cell is a property of table or the cells themselves */

  /* vertical-align: baseline | sub | super | text-top | 
                text-bottom | middle | top | bottom | 
                <percentage> | <length> */

  /* tbody {
    vertical-align: top;
  }              */
  td,
  th {
    border: none;
    padding: 5px;
  }
  /* td,
  th {
    border: 1px solid;
  } */

  td {
    padding: 10px 10px;
  }

  tbody tr {
    :nth-of-type(odd) {
      background-color: #efefef;
    }
    :hover {
      background-color: #96fff6;
    }
  }
  thead > th {
    background-color: #00baad;
    color: white;
  }
  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`;

export const ButtonStyle = styled.button`
  width: 80px;
  height: 40px;
  background: #00baad;
  border: none;
  color: white;
  border-radius: 5px;
  font-size: 18px;
  margin: 10px 10px;
  cursor: pointer;
`;

export const InputStyle = styled.input`
  width: 300px;
  padding: 4px 12px;
  background-color: #fafbfc;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 10px;
  outline: none;
  box-shadow: inset 0 1px 0 rgba(225, 228, 232, 0.2);
  margin-top: 10px;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
`;
