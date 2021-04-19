import React, { useState, useCallback, memo } from 'react';
import { Upload, notification } from 'antd';
import storage from '@utils/storage';
import { getBase64 } from '@utils/storage/services';
import UploadButton from '@components/buttons/uploads';
import Image from 'next/image';

const AvatarUpload = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const beforeUpload = useCallback((file: Blob) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      notification.error({
        message: 'Bạn chỉ có thể tải lên ảnh JPG/PNG!',
      });
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      notification.error({ message: 'Ảnh phải nhỏ hơn 2MB!' });
    }
    return isJpgOrPng && isLt2M;
  }, []);

  const handleChange = useCallback(
    (info) => {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, (image: string) => {
          setImageUrl(image);
          setLoading(false);

          const storageRef = storage.ref().root.child('users/room.png');
          storageRef.putString(imageUrl, 'data_url');
        });
      }
    },
    [imageUrl]
  );

  return (
    <Upload
      listType="picture-card"
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="avatar"
          width={400}
          height={400}
          layout="intrinsic"
        />
      ) : (
        <UploadButton loading={loading} />
      )}
    </Upload>
  );
};

export default memo(AvatarUpload);
