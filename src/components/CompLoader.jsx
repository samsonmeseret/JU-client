import React from "react";
import { ThreeDots } from "react-loader-spinner";

const CompLoader = ({ color, height }) => {
  return (
    <>
      <ThreeDots
        height={height}
        width="100%"
        radius="9"
        color={color}
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </>
  );
};

export default CompLoader;
