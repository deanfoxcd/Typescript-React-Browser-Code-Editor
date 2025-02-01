import { CellTypes } from '../state/cell';
import { Cell } from '../state';
import { JSXElement } from 'jscodeshift';
import CodeCell from './code-cell';
import TextEditor from './text-editor';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = function ({ cell }) {
  let child: JSX.Element;

  if (cell.type === 'code') {
    child = <CodeCell />;
  } else {
    child = <TextEditor />;
  }

  return <div>{child}</div>;
};

export default CellListItem;
