import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={styles.main}>
      Home
      <div>
        <Link to="info">Info</Link>
      </div>
    </div>
  );
};

const styles = {
  main: {
    maxWidth: "420px",
    height: "570px",
    background: "#f9fafc",
    boxSizing: "border-box",
  },
};

export default Home;
