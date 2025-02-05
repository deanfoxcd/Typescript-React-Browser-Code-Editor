import { useActions } from '../hooks/use-actions';
import './add-cell.css';

interface AddCellProps {
  nextCellId: string;
}

const AddCell: React.FC<AddCellProps> = function ({ nextCellId }) {
  const { insertCellBefore } = useActions();

  return (
    <div>
      <button onClick={() => insertCellBefore(nextCellId, 'code')}>CODE</button>
      <button onClick={() => insertCellBefore(nextCellId, 'text')}>TEXT</button>
    </div>
  );
};

export default AddCell;
