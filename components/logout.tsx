import { fetchAPI } from '@utils/services';
import { storage } from '@utils/firebaseUploadFile';
import { Avatar, Button, Dropdown, Menu, notification, Progress } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SpanImg } from '@components/forms/register/styles';
import { AvarIcon, Hr, UpLoad, PickImg } from './forms/logout';

const getRandomInt = (max: number) => Math.floor(Math.random() * max);
const Autoset = ({ data, dataUser }) => {
  const colorRender = localStorage.getItem('color');
  const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
  const colorNum = getRandomInt(ColorList.length);
  const [color] = useState(ColorList[colorNum]);

  const router = useRouter();
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(dataUser?.data?.picture || null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!colorRender) {
      localStorage.setItem('color', color);
    }
    setProgress(0);
  }, []);

  const logout = async () => {
    const res = await fetchAPI({
      url: 'http://localhost:3000/api/logout',
      method: 'GET',
      payload: '',
    });
    const results = await res.json();

    if (res.ok) {
      notification.success({
        message: results.message,
      });
      router.push('/login');
    }
  };

  const handleChange = async (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    setProgress(0);
    notification.close('1');
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progresss = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progresss);
      },
      (error) => {},
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((urls) => {
            setUrl(urls);
            fetchAPI({
              url: 'http://localhost:3000/api/upPhoto',
              method: 'POST',
              payload: {
                ...dataUser,
                photo: urls,
                nameimg: image.name,
              },
            });
            setTimeout(() => {
              setImage(null);
              setProgress(0);
            }, 3000);
          });
      }
    );
  };

  const openNotification = () => {
    notification.open({
      message: 'Chọn ảnh từ máy',
      description: showSet(),
      key: '1',
      duration: 1000,
    });
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Button onClick={openNotification}> Thay ảnh </Button>
      </Menu.Item>
      <Hr />
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Thông tin cá nhân
        </a>
      </Menu.Item>
      <Hr />
      <Menu.Item>
        <Button onClick={logout}>Đăng xuất</Button>
      </Menu.Item>
    </Menu>
  );
  const showSet = () => <PickImg type="file" onChange={handleChange} />;

  return (
    <>
      {image ? (
        <>
          <Button onClick={handleUpload}> Tải lên </Button>
          <UpLoad>
            <Progress size="small" status="active" percent={progress} />
          </UpLoad>
        </>
      ) : null}
      <Dropdown
        overlay={menu}
        placement="bottomCenter"
        arrow
        trigger={['click']}
      >
        {!url ? (
          <AvarIcon style={{ cursor: 'pointer' }}>
            <Avatar
              style={{ backgroundColor: colorRender, verticalAlign: 'middle' }}
              size={30}
              gap={2}
            >
              {data.username.charAt(0).toUpperCase()}
            </Avatar>
          </AvarIcon>
        ) : (
          <SpanImg src={url || data.picture} />
        )}
      </Dropdown>
    </>
  );
};
export default Autoset;
