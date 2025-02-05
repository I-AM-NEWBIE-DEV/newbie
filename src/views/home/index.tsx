import './index.css';
import Logo from '../../assets/logo.jpg'
import Launch from '../../assets/launch.gif'
function Home() {
  return <div className="home_wrapper">
    <div className="navbar">
      <a href="/">
        <img src={Launch} className="label_icon" />
      </a>
      <a className="ca" href="#__newbie">$NEWBIE</a>
      <a className="event" href="#__event">STAGES</a>
    </div>
    <div className="main">
      <div className="space"></div>
      <h1 className="name mt-2 gradient-text">
        NEWBIE NOT LOOSER.
      </h1>
      <div id="__info" className="box mt-2">
        <div className="box-title gradient-text">MORE</div>
        <p className="info-link info-ca-text mt-2">CA: BCkJg2dSzDU4K7qHJf2HJHUK3cdJksNdLELP1YjQpump</p>
        <p  className="mt-1">
          <a className="info-link" href="https://pump.fun/coin/BCkJg2dSzDU4K7qHJf2HJHUK3cdJksNdLELP1YjQpump">PUMP.FUN</a>
        </p>
        <p className="mt-1">
          <a className="info-link" href="https://t.me/I_AM_A_NEWBIE">TG GROUP</a>
        </p>
        <p className="mt-1">
          <a className="info-link" href="https://x.com/jujujuju_baby/status/1881739094327447973?s=19">X LINK</a>
        </p>
      </div>
      <div id="__event" className="box mt-2">
        <div className="box-title gradient-text">STAGE ONE</div>
        <br></br>
        So far, the airdrop has been completed, including over 140 tokens. (Event End)
        <br></br>
        <br></br>
        <div className="box-title gradient-text">STAGE TWO</div>
        <br></br>
        Go live with $NEWBIE Lite Version Website. (Event End)
        <br></br>
        <br></br>
        <div className="box-title gradient-text">STAGE THREE</div>
        <br></br>
        Join the TG GROUP for $NEWBIE rewards. (End Time: PST 20:00:00 23/01/25)
        <br></br>
        <br></br>
        <div className="box-title gradient-text">STAGE FOUR</div>
        <br></br>
        In order to expand the community and attract more new members, I will implement a series of measures. (DOING)
        <br></br>
        <br></br>
        <div className="box-title gradient-text">MORE STAGE</div>
        <br></br>
        STAY TUNED
      </div>
      <div id="__newbie" className="box mt-2 mb-2">
        <div className="box-title gradient-text">WHY CREATED $NEWBIE</div>
        <br></br>
        I AM A NEWBIE. <br></br>
        BUT MORE IMPORTANTLY, I AM A FAILURE IN CRYPTO.<br></br>
        I'M FED UP WITH LIES AND MANIPULATION.<br></br>
        <br></br>
        SO I CREATED $NEWBIE.<br></br>
        ALTHOUGH I AM TINY RIGHT NOW.<br></br>
        I BELIEVE MY FUTURE WILL BE EXTREMELY BRIGHT.<br></br>
        <br></br>
        WE ACCEPT SUCCESSFUL PEOPLE.<br></br>
        WE WELCOME THOSE WHO HAVE FAILED EVEN MORE.<br></br>
        AND WE ALSO WELCOME EVERYONE.<br></br>
        <br></br>
        JOIN, JOIN, JOIN US.
        MORE PLANS FOR THE FUTURE.
        <br></br>
        <br></br>
        <img src={Logo} className="logo" />
      </div>
    </div>
  </div>;
}

export default Home;