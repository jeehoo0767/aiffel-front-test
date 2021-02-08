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

export const TextAreaStyle = styled.textarea`
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

export const SelectBoxStyle = styled.select`
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

export const Modal = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 12212;
  font-weight: bold;
`;

export const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ModalContent = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #00baad;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 5px 5px 5px;
`;
