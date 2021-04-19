import React, { memo } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const UploadButton = ({ loading }: { loading: boolean }) => (
  <div>
    {loading ? <LoadingOutlined /> : <PlusOutlined />}
    <div style={{ marginTop: 8 }}>Tải lên</div>
  </div>
);

export default memo(UploadButton);
