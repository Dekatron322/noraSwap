import React, { useState } from "react";
import { Button, Card, Popover } from "antd";
import { TradeEntry } from "./trade";
import { AddToLiquidity } from "./pool/add";
import { PoolAccounts } from "./pool/view";
import { useWallet } from "../utils/wallet";
import { AccountInfo } from "./accountInfo";
import { Settings } from "./settings";
import { SettingOutlined } from "@ant-design/icons";
import { EllipsisOutlined } from "@ant-design/icons";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
export const ExchangeView = (props: {}) => {
  const { connected, wallet } = useWallet();
  const tabStyle: React.CSSProperties = { width: 120 };
  const tabList = [
    {
      key: "trade",
      tab: <div style={tabStyle}>Trade</div>,
      render: () => {
        return <TradeEntry />;
      },
    },
    {
      key: "pool",
      tab: <div style={tabStyle}>Pool</div>,
      render: () => {
        return <AddToLiquidity />;
      },
    },
  ];

  <div>

  </div>

  const [activeTab, setActiveTab] = useState(tabList[0].key);

  const TopBar = (
    <div className="App-Bar" style={{ marginBottom: "60px"}}>
      <div className="App-Bar-left">
        <div className="App-logo" />
        <Button type="text" size="large" style={{ color: "#2abdd2", paddingLeft: "25px" }}>
          <a
            href={"#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Swap
          </a>
        </Button>
        
        
        
      </div>
      <div className="App-Bar-right">
        
        <div>
          {!connected && (
            <Button
              type="text"
              size="large"
              onClick={connected ? wallet.disconnect : wallet.connect}
              style={{ color: "#000000", background: "#0CEDFC",  }}
            >
              Connect to a wallet
            </Button>
          )}
          {connected && (
            <Popover
              placement="bottomRight"
              title="Wallet public key"
              trigger="click"
            ></Popover>
          )}
        </div>
        <Button type="text" size="large" style={{ background: "#DA0CFC", marginRight: "20px", marginLeft: "20px" }}>
          <a
            href={"#"}
           
            rel="noopener noreferrer"
          >
            PNG
          </a>
        </Button>
        <AccountInfo />
        {connected && (
          <Popover
            placement="bottomRight"
            content={<PoolAccounts />}
            trigger="click"
          >
            <Button type="text">My Pools</Button>
          </Popover>
        )}
        {
          <Popover
            placement="topRight"
            title="Settings"
            content={<Settings />}
            trigger="click"
          >
            <Button
              style={{ background: "rgba(255, 255, 255, 0.1)" }}
              shape="circle"
              size="large"
              type="text"
              icon={<SettingOutlined />}
            />

          </Popover>
        }
        
          
      </div>

      <div className="App-Bar-bottom">
        
        <div>
          {!connected && (
            <Button
              type="text"
              size="large"
              onClick={connected ? wallet.disconnect : wallet.connect}
              style={{ color: "#000000", background: "#0CEDFC",  }}
            >
              Connect wallet
            </Button>
          )}
          {connected && (
            <Popover
              placement="bottomRight"
              title="Wallet public key"
              trigger="click"
            ></Popover>
          )}
        </div>
        
      </div>



    </div>




  );

  return (
    <>
      {TopBar}
      <Card
        className="exchange-card"
        headStyle={{ padding: 0 }}
        tabList={tabList}
        tabProps={{
          tabBarGutter: 0,
        }}
        activeTabKey={activeTab}
        onTabChange={(key) => {
          setActiveTab(key);
        }}
      >
        {tabList.find((t) => t.key === activeTab)?.render()}
      </Card>
    </>
  );
};
