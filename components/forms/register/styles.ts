// import styled from 'styled-components'
import styled from 'styled-components';
import { Layout, Form } from 'antd';

const { Sider } = Layout;

export const CustomLayout = styled(Layout)`
  min-height: 100vh;
`;
export const CustomSider = styled(Sider)`
  min-width: 700px !important ;
  background-color: #999999;
  @media (max-width: 1110px) {
    display: none;
  }
`;
export const CustomButtonForm = styled(Form.Item)`
  .ant-form-item-control-input-content {
    margin-left: 45%;
    /* border:1px solid; */
    display: flex;
    justify-content: space-between;
  }

  /* transform:translate(-50px,-200px); */
  /* @media (max-width:900px){
transform:translateY(-200px); */
  /* transform:translateX(00px); */
`;
export const CustomButtonForm2 = styled(Form.Item)`
  margin-bottom: 5px;
  .ant-form-item-control-input-content {
    margin-left: 0%;
    /* border:1px solid; */
    display: flex;
    justify-content: space-between;
  }
  .ant-form-item {
    margin-bottom: 0;
  }
`;
export const DivIconPlugin = styled.div`
  max-width: 150px;
  max-height: 150px;
  min-height: 50px;
  min-width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ButtonNoBorder = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
`;
