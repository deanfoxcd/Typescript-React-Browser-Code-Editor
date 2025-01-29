import { ResizableBox } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = function ({ direction, children }) {
  return (
    <ResizableBox height={300} width={300} resizeHandles={['s']}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;
