import {
  DownOutlined,
  SettingOutlined,
  LogoutOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Dropdown, Space, Button } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../Redux/reducers/authSlice";
import { useDispatch } from "react-redux";
// import Cookie from "universal-cookie";
import { axiosInstance } from "../../api/axios";

// const cookie = new Cookie();

const DropdownMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = async () => {
    await axiosInstance.get("/logout");
    dispatch(logout());
    // window.location.reload();
    // cookie.remove("us_id");
  };

  const navigateHandler = () => {
    navigate("/dashboard");
  };
  const items = [
    {
      key: "1",
      label: (
        <div onClick={navigateHandler}>
          <Button>Dashboard</Button>
        </div>
      ),
      icon: <BarChartOutlined />,
    },
    {
      key: "2",
      label: <p onClick={logOutHandler}>log Out</p>,
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <SettingOutlined />
          Space
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};
export default DropdownMenu;
