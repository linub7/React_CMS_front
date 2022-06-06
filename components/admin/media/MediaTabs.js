import { Tabs } from 'antd';
import MediaLibrary from './MediaLibrary';
import UploadFile from './UploadFile';

const { TabPane } = Tabs;

const MediaTabs = () => {
  return (
    <Tabs>
      <TabPane tab="Upload File" key="1">
        <UploadFile />
      </TabPane>
      <TabPane tab="Media Library" key="2">
        <MediaLibrary />
      </TabPane>
    </Tabs>
  );
};

export default MediaTabs;
