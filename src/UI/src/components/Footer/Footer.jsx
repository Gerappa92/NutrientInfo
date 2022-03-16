import React from "react";
import { Layout, Divider } from "antd";

export default function Footer() {
  return (
    <Layout.Footer>
      Gerappa Design © 2021 Created by Krzysztof Juszcze
      <Divider />
      <div>
        {" "}
        Icons made by
        <a href="https://www.freepik.com" title="Freepik">
          {" "}
          Freepik
        </a>{" "}
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          {" "}
          www.flaticon.com
        </a>
      </div>
    </Layout.Footer>
  );
}
