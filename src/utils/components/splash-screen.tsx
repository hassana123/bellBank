import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import { AppImage } from '~/components/controls';
import { APP_NAME, LOGO_IMAGE } from '~/config';

const SplashScreen = () => (
  <div className=" flex flex-col flex-grow fixed h-full items-center justify-center w-full">
    <div className="mb-8">
      <AppImage className="h-[30px] mx-auto w-[128px]" src={LOGO_IMAGE} alt={APP_NAME} />
    </div>
    <Spin indicator={<LoadingOutlined className="text-color-2" />} spinning size="default" />
  </div>
);

export default SplashScreen;
