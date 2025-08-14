import { LoadingOutlined } from '@ant-design/icons';

import { Spin } from '../../components/controls';

export default function LoadingScreen() {
  return (
    <div className="flex flex-grow items-center min-h-[45vh] justify-center">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} percent="auto" />
    </div>
  );
}

export function OverlayLoadingScreen() {
  return (
    <div
      className="flex flex-grow fixed h-full items-center justify-center main-container-width top-0 right-0 w-full z-[20]"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      }}
    >
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} percent="auto" />
    </div>
  );
}
