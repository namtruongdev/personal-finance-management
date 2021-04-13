/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import { storage } from '@utils/firebaseUploadFile';
import MainLayout from '@layouts/main';
import { signIn } from 'next-auth/client';
import { withAuthSSP } from '@utils/auth/index';
import { Progress } from 'antd';
import { fetchAPI } from '@utils/services';

const Home = ({ user, dataUser }) => {
  // const { id } = dataUser
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
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
              payload: { ...dataUser, photo: urls, nameimg: image.name },
            });
          });
      }
    );
  };

  return (
    <MainLayout users={user}>
      <h1>Bảng điều khiển</h1>
      <button type="button" onClick={() => signIn()}>
        Dang nhap
      </button>

      <div>
        <Progress percent={progress} />

        <br />
        <br />
        <input type="file" onChange={handleChange} />
        <button type="button" onClick={handleUpload}>
          Upload
        </button>
        <br />
        {url}
        <br />
        <img
          style={{ maxHeight: '300px', maxWidth: '300px' }}
          src={url || 'http://via.placeholder.com/300'}
          alt="firebase-image"
        />
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = withAuthSSP();

export default Home;
