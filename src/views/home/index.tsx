import "./index.css";
import { Link } from "react-router-dom";
import { Button, Space, Toast, Divider } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { copyTextToClipboard } from '../../tools/index'

const CA_ADDRESS = "BCkJg2dSzDU4K7qHJf2HJHUK3cdJksNdLELP1YjQpump";
const TG_LINK = "https://t.me/I_AM_A_NEWBIE";
const X_LINK = "https://x.com/jujujuju_baby/status/1881739094327447973?s=19";
const PUMPFUN_LINK =
  "https://pump.fun/coin/BCkJg2dSzDU4K7qHJf2HJHUK3cdJksNdLELP1YjQpump";

function Page() {
  const navigate = useNavigate();
  return (
    <div className="home_wrapper common-grid-i">
      <div className="accordion_container_wrapper">
        <div className="container">
          <div className="head">Token Multisender</div>
          <div className="body">
            <p className="">
              This is a batch transfer tool.<br></br>
              with no high gas fees or transaction fees.<br></br>
              convenient and fast!<br></br>
            </p>
          </div>
          <div className="btn" onClick={() => navigate("/batch")}>
            {/* <Link to={"/batch"}>TRY IT</Link> */}
            TRY IT
          </div>
        </div>

        <div className="container">
          <div className="head">About $NEWBIE</div>
          <div className="body-grid">
            <div
              className="body-item-grid"
              onClick={() => copyTextToClipboard(CA_ADDRESS)}
            >
              {/* <img className="body-item-icon" src={CA_ICON} alt="ca" /> */}
              CA
            </div>
            <div
              className="body-item-grid"
              onClick={() => window.open(PUMPFUN_LINK)}
            >
              PUMP<br></br>FUN
            </div>
            <div
              className="body-item-grid"
              onClick={() => window.open(TG_LINK)}
            >
              TG
            </div>
            <div className="body-item-grid" onClick={() => window.open(X_LINK)}>
              X
            </div>
          </div>
          <div className="btn"  onClick={() => navigate("/about")}>
            {/* <Link to={"/about"}>MORE</Link> */}
            MORE
          </div>
        </div>

        <div className="container">
          <div className="head">WAHT IS NEWBIE.TOOLS ?</div>
          <div className="body">
            <p className="">
              Empower the ecosystem for $NEWBIE, and develop more tools
              according to the plan.
            </p>
            <div className="accordion_content">
              <div className="accordion_content_container">
                <Divider
                  style={{
                    color: "#a1adad",
                    borderColor: "#a1adad",
                    borderStyle: 'dashed'
                  }}
                >
                  DONE
                </Divider>
                <div className="accordion-grid">
                  <div className="accordion-item-grid">BATCH</div>
                </div>
                <Divider
                  style={{
                    color: "#a1adad",
                    borderColor: "#a1adad",
                    borderStyle: 'dashed'
                  }}
                >
                  TODO
                </Divider>
              </div>
            </div>
            <div className="link">
              <a href="mailto:pleasenottouchme@gmail.com">
                please tell me what tools you need me to develop for you.
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
