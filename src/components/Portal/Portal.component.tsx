import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const mountingElement = document.body;

interface PortalProps {
  open: boolean;
  className?: string;
}

const useTemporalNode = (opts: PortalProps) => {
  const [element] = useState(() => {
    const el = document.createElement('div');
    el.setAttribute('id', `modal-${Date.now().toString()}`);
    el.setAttribute('role', 'dialog');
    el.classList.add(...((opts.className || '').split(' ')));

    return el;
  });

  useEffect(() => {
    mountingElement.appendChild(element);
    return () => {
      mountingElement.removeChild(element);
    }
  }, []);

  useEffect(() => {
    element.classList.toggle('open', opts.open);
  }, [opts.open]);

  return element;
};

export const Portal: React.FunctionComponent<PortalProps> = ({ children, ...otherProps }) => {
  const node = useTemporalNode(otherProps);

  return !open ? null : createPortal(
    children,
    node
  );
};
