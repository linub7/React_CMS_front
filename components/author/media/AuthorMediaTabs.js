import { Tabs } from 'antd';
import MediaLibrary from 'components/admin/media/MediaLibrary';
import UploadFile from 'components/admin/media/UploadFile';

const { TabPane } = Tabs;

const AuthorMediaTabs = () => {
  return (
    <Tabs>
      <TabPane tab="Upload File" key="1">
        <UploadFile />
      </TabPane>
      <TabPane tab="Media Library" key="2">
        <MediaLibrary author={true} />
      </TabPane>
    </Tabs>
  );
};

export default AuthorMediaTabs;
