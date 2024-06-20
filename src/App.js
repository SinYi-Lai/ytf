import React, {useState, useEffect} from 'react'
import { ProgressBar } from "react-bootstrap";
import './styles/App.scss';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AnchorLink from 'react-anchor-link-smooth-scroll';
// lottie 引入
import Lottie from "lottie-react";
import lottie_arrow from "./json/CTA01.json";
import lottie_hand from "./json/CTA02.json";
import lottie_yt from "./json/data.json"; 

// svg 引入
import { imagesSVG } from './lib/imagesSVG'
// timeMe
import TimeMe from 'timeme.js';


function App() {

  // 獲取裝置高度
  useEffect(() => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }, [])

  const [page, setPage] = useState('home');  // 用來跳轉畫面
  const [answers, setAnswers] = useState([]);  // 答案陣列
  const [step, setStep] = useState(1);  // 目前步驟，用來控制 process bar & 上一題按鈕 &
  const [showImage, setShowImage] = useState(false);  // 加點... 配方圖片淡入淡出
  const [id, setId] = useState(0);  // 當第一次打 API 時，存下拿到的 id 號碼
  const [countTime, setCountTime] = useState(0);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [job, setJob] = useState('');
  const [showErrorMessage , setShowErrorMessage] = useState(false);
  const [showResult , setShowResult] = useState(false);

  // timeMe
  useEffect(() => {
    TimeMe.initialize({
      idleTimeoutInSeconds: 60 // seconds
    }); 

    setInterval(() => {
      setCountTime(TimeMe.getTimeOnCurrentPageInSeconds().toFixed())
    }, 1000);

  }, [countTime]);

  // onload 到提交第 1 題花了幾秒 & 取得 id
  const postQ1 = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL_DEV}/survey`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({q1:countTime}),
    })
    .then(response => {
      if (response.status !== 200) {
        console.log(response)
      } else {
        return response.json();
      }
    })
    .then(data => {
      if (data.status !== "success") {
        console.log(data)
      } else {
        console.log('[Finished Q1] Data update successfully - countTime: ' + countTime, data)
        setId(data.id); // 取得此次 ID
      }
    })
  };

  // onload 到提交第 2 題花了幾秒
  const patchQ2 = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL_DEV}/survey`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({id:id,q2:countTime}),
    })
    .then(response => {
      if (response.status !== 200) {
        console.log(response)
      } else {
        return response.json();
      }
    })
    .then(data => {
      if (data.status !== "success") {
        console.log(data)
      } else {
        console.log('[Finished Q2] Data update successfully - countTime: ' + countTime, data)
      }
    })
  };

  // onload 到提交第 3 題花了幾秒
  const patchQ3 = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL_DEV}/survey`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({id:id,q3:countTime}),
    })
    .then(response => {
      if (response.status !== 200) {
        console.log(response)
      } else {
        return response.json();
      }
    })
    .then(data => {
      if (data.status !== "success") {
        console.log(data)
      } else {
        console.log('[Finished Q3] Data update successfully - countTime: ' + countTime, data)
      }
    })
  };

  // onload 到提交第 4 題花了幾秒 & 提交答案
  const patchQ4 = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL_DEV}/survey`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: id,
        q4: countTime,
        answer: answers.join('')
      }),
    })
    .then(response => {
      if (response.status !== 200) {
        console.log(response)
      } else {
        return response.json();
      }
    })
    .then(data => {
      if (data.status !== "success") {
        console.log(data)
      } else {
        console.log('[Finished Q4] Data update successfully - countTime: ' + countTime + ', answers: ' + answers.join(''), data)
      }
    })
  };

  // PATCH 訪客資料
  const patchData = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL_DEV}/survey`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id:id,
        name: name,
        gender: gender,
        age: age,
        job: job,
      }),
    })
    .then(response => {
      if (response.status !== 200) {
        console.log(response)
      } else {
        return response.json();
      }
    })
    .then(data => {
      if (data.status !== "success") {
        console.log(data)
      } else {
        console.log('[Finished Form] Data update successfully', data)
      }
    })
  };

  // 紀錄是否 Click 下載測驗結果
  const patchDownloadClick = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL_DEV}/survey`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id:id,
        clickType:'Click'
      }),
    })
    .then(response => {
      if (response.status !== 200) {
        console.log(response)
      } else {
        return response.json();
      }
    })
    .then(data => {
      if (data.status !== "success") {
        console.log(data)
      } else {
        console.log('[On Download - Click] Data update successfully', data)
      }
    })
  };
  
  // 紀錄是否 TouchCancle 下載測驗結果
  const patchDownloadTouchCancle = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL_DEV}/survey`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id:id,
        clickType:'TouchCancle'
      }),
    })
    .then(response => {
      if (response.status !== 200) {
        console.log(response)
      } else {
        return response.json();
      }
    })
    .then(data => {
      if (data.status !== "success") {
        console.log(data)
      } else {
        console.log('[On Download - TouchCancle] Data update successfully', data)
      }
    })
  };
  
  // 紀錄是否 TouchEnd 下載測驗結果
  const patchDownloadTouchEnd = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL_DEV}/survey`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id:id,
        clickType:'TouchEnd'
      }),
    })
    .then(response => {
      if (response.status !== 200) {
        console.log(response)
      } else {
        return response.json();
      }
    })
    .then(data => {
      if (data.status !== "success") {
        console.log(data)
      } else {
        console.log('[On Download - TouchEnd] Data update successfully', data)
      }
    })
  };


  useEffect(() => {
    if (answers.length === 1) {         // 完成第 1 題
      postQ1();
    }else if (answers.length === 2) {   // 完成第 2 題
      patchQ2();
    }else if (answers.length === 3) {   // 完成第 3 題
      patchQ3();
    }else if (answers.length === 4) {   // 完成第 4 題
      patchQ4();
    }
    // 取消檢驗下一行
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers]);

  // 新增最新答案 & 跳轉題目
  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    setShowImage(true); // 選擇答案時，顯示圖片
  };

  // 當播放 Loading 到第 N 秒的時候淡入結果
  useEffect(() => {
    if (page === "loading") {
      window.setTimeout(() => { 
        setShowResult(true);
      },5000)
    }
  }, [page]);

  // 回到上一題 & 刪掉上一題的答案重新選擇
  const handlePrevStep = () => {
    setStep(step - 1);
    setAnswers(answers.slice(0, -1));
  };

  // 隱藏推薦影片 & 到下一題
  const handleHideImgAndNext = () => {
    setShowImage(false);
    setStep(step + 1);
  }

  // 隱藏推薦影片 & 到 fbx
  const handleHideImgAndShowFbx = () => {
    setShowImage(false);
    setPage("fbx")
  }
  
  // 按下 “產出報告” 按鈕，驗證完 -> 跳轉到 loading & 傳資料到 strapi
  const handleSubmit = () => {
    if (job !== '' && age !== '' && gender !== '' && /\S/.test(name)) {
      setShowErrorMessage(false);
      patchData();
      setPage("loading");
    } else {
      setShowErrorMessage(true);
    }
  }

  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };
  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };
  const handleChangeJob = (event) => {
    setJob(event.target.value);
  };

  // progress bar
  let progress = 0;
  if (step === 1) {progress = 25;}
  else if (step === 2) {progress = 50;}
  else if (step === 3) {progress = 75;}
  else if (step === 4) {progress = 100;}

  // 推薦影片內容
  const formula01 =
    <>
      <div className="formula_award"><span className="yt700">2023</span> 最佳遊戲廣告獎</div>
      <a className="formula_img" href="https://googleads.link/23ytfgan01" target="_blank" rel="noreferrer">
        <img src="https://oss.uppmkt.com/202308/ytfg/m/video/2023 最佳遊戲廣告獎.png" alt=""/>
      </a>
    </>
  const formula02 =
    <>
      <div className="formula_award"><span className="yt700">2023</span> 最佳創作者合作獎</div>
      <a className="formula_img" href="https://googleads.link/23ytfgan02" target="_blank" rel="noreferrer">
        <img src="https://oss.uppmkt.com/202308/ytfg/m/video/2023 最佳創作者合作獎.png" alt=""/>
      </a>
    </>
  const formula03 =
    <>
      <div className="formula_award"><span className="yt700">2023</span> 最佳媒體綜效獎</div>
      <a className="formula_img" href="https://googleads.link/23ytfgan03" target="_blank" rel="noreferrer">
        <img src="https://oss.uppmkt.com/202308/ytfg/m/video/2023 最佳媒體綜效獎.png" alt=""/>
      </a>
    </>
  const formula04 =
    <>
      <div className="formula_award"><span className="yt700">2023</span> 最佳跨平台廣告獎</div>
      <a className="formula_img" href="https://googleads.link/23ytfgan04" target="_blank" rel="noreferrer">
        <img src="https://oss.uppmkt.com/202308/ytfg/m/video/2023 最佳跨平台廣告獎.png" alt=""/>
      </a>
    </>
  const formula05 =
    <>
      <div className="formula_award"><span className="yt700">2023</span> 最佳社會貢獻獎</div>
      <a className="formula_img" href="https://googleads.link/23ytfgan05" target="_blank" rel="noreferrer">
        <img src="https://oss.uppmkt.com/202308/ytfg/m/video/2023 最佳社會貢獻獎.png" alt=""/>
      </a>
    </>
  const formula06 =
    <>
      <div className="formula_award"><span className="yt700">2023</span> 最佳品牌創作者獎</div>
      <a className="formula_img" href="https://googleads.link/23ytfgan06" target="_blank" rel="noreferrer">
        <img src="https://oss.uppmkt.com/202308/ytfg/m/video/2023 最佳品牌創作者獎.png" alt=""/>
      </a>
    </>
  const formula07 =
    <>
      <div className="formula_award"><span className="yt700">2023</span> 最佳媒體綜效獎</div>
      <a className="formula_img" href="https://googleads.link/23ytfgan07" target="_blank" rel="noreferrer">
        <img src="https://oss.uppmkt.com/202308/ytfg/m/video/2023 最佳媒體綜效獎.png" alt=""/>
      </a>
    </>
  const formula08 =
    <>
      <div className="formula_award"><span className="yt700">2023</span> 最佳創意呈現獎</div>
      <a className="formula_img" href="https://googleads.link/23ytfgan08" target="_blank" rel="noreferrer">
        <img src="https://oss.uppmkt.com/202308/ytfg/m/video/2023 最佳創意呈現獎.png" alt=""/>
      </a>
    </>
  const formula09 =
    <>
      <div className="formula_award"><span className="yt700">2023</span> 最佳在地新星獎</div>
      <a className="formula_img" href="https://googleads.link/23ytfgan09" target="_blank" rel="noreferrer">
        <img src="https://oss.uppmkt.com/202308/ytfg/m/video/2023 最佳在地新星獎.png" alt=""/>
      </a>
    </>
  const formula10 =
    <>
      <div className="formula_award"><span className="yt700">2023</span> 年度大賞</div>
      <a className="formula_img" href="https://googleads.link/23ytfgan10" target="_blank" rel="noreferrer">
        <img src="https://oss.uppmkt.com/202308/ytfg/m/video/2023 年度大賞.png" alt=""/>
      </a>
    </>

const formulabottom =
    <>
      <div className="formula_notice">
        點擊畫面繼續
      </div>
      <Lottie
        className="formula_hand"
        animationData={lottie_hand}
        loop={true}
      />
      <div className="yt_white">
        {imagesSVG.yt()}
      </div>
    </>


  return (
    <div className="App">
      {/* <div style={{position:"absolute", top:"0", fontSize:"18px", left:"0", backgroundColor:"black", color:"white", zIndex:"2"}}>{countTime}</div> */}
      <div className="greybg">
        <div className="container">
          <div className="wrap"> 
              {/** 尋找專屬於你的影音 */}
              {page === 'home' && (
                <div className="start">
                  <div className="yt_red">
                    {imagesSVG.y()}
                  </div>
                  <div className="yt_white">
                    {imagesSVG.yt()}
                  </div>
                  <div className="start_tc">
                    尋找專屬於你的影音
                  </div>
                  <div className="start_en yt900">
                    DNA
                  </div>
                  <div className="start_btn btn" onClick={() => setPage("intro")}>
                    <span className="start_btn_text" >開始尋找</span>
                    <Lottie
                      className="start_btn_icon"
                      animationData={lottie_arrow}
                      loop={true}
                    />
                  </div>
                </div>
              )}

              {/* * 前言 */}
              {page === 'intro' && (
                <Fade in={page === 'intro'} timeout={600}>
                  <div className="game0 btn" onClick={() => setPage("questions")}>
                    <div className="yt_red">
                      {imagesSVG.y()}
                    </div>
                    <div className="yt_white">
                      {imagesSVG.yt()}
                    </div>
                    <div className="game0_title_en yt900">
                      Welcome
                    </div>
                    <div className="game0_title_tc">
                      影音工作室
                    </div>
                    <div className="game0_intro">
                      你知道嗎？
                    </div>
                    <div className="game0_intro">
                      每個人的身體裡其實都有著<br/>專屬的<strong className="orange">「影音 <span className="yt700 orange">DNA</span>」</strong>，<br/>且不斷影響著你生活中的每個決定。
                    </div>
                    <div className="game0_intro">
                      請你推開大門，進入工作室，<br/>解鎖你的 <span className="yt400">DNA</span>，尋找屬於你的隱藏潛能...
                    </div>
                    <div className="game0_notice">
                      點擊畫面尋找隱藏能力
                    </div>
                    <Lottie
                      className="game0_hand"
                      animationData={lottie_hand}
                      loop={true}
                    />
                  </div>
                </Fade>
              )}

              {/* * 題目們 */}
              {page === 'questions' && (
              
                <div className="game_container">
                  {/* 上一題按鈕 */}
                    <div style={{minHeight:"18px"}}>
                    {step !== 1 && (
                      <div className="game_back btn" onClick={handlePrevStep}>
                        <div className="game_back_arrow">
                          {imagesSVG.back_arrow()}
                        </div>
                        <span className="game_back_text">回上頁</span>
                      </div>
                    )}
                    </div>
              
                  {/* ProgressBar */}
                    {step !== 5 && (
                      <ProgressBar now={progress} />
                    )}

                    <div className="yt_white">
                      {imagesSVG.yt()}
                    </div>
                
                {/* * 題目-1 */}
                {step === 1 && (
                  <>
                    <Slide direction="down" timeout={400} in={true} mountOnEnter unmountOnExit>
                      <div className="game_card">
                        <div className="game_i yt700">1</div>
                        <div className="game_q">
                          想進入工作室，發現入口竟然出現了兩道門，這時你會推開？
                        </div>
                        <div className="game_a btn" onClick={() => handleAnswer("A")}>
                          <div className="game_a_i">
                            <img src="https://oss.uppmkt.com/202308/ytfg/1-1.svg" alt=""/>
                          </div>
                          <div className="game_a_text">五彩繽紛的不規則木門</div>
                        </div>
                        <div className="game_a btn" onClick={() => handleAnswer("B")}>
                          <div className="game_a_i">
                            {imagesSVG.ai1_2()}
                          </div>
                          <div className="game_a_text">被植物覆蓋住的厚重鐵門</div>
                        </div>
                      </div>
                    </Slide>

                    <Fade in={showImage} timeout={600}>
                      <div className="formula_box btn" onClick={handleHideImgAndNext}>
                        <div className="formula_t1">
                          推薦
                        </div>
                        {answers[0] === "A" && (
                          <>
                            <div className="formula_content">
                              不按牌理出牌的你
                            </div>
                            {formula08}
                          </>
                        )}
                        {answers[0] === "B" && (
                          <>
                            <div className="formula_content">
                              勇於乘風破浪的你
                            </div>
                            {formula04}
                          </>
                        )}
                        {formulabottom}
                      </div>
                    </Fade> 
                  </>
                )}

                {/* * 題目-2 */}
                {step === 2 && answers[0] === "A" && (
                  <>
                    <Slide direction="down" timeout={400} in={true} mountOnEnter unmountOnExit>
                      <div className="game_card">
                        <div className="game_i yt700">2</div>
                        <div className="game_q">
                          打開門後，眼前有許多播放不同創作內容的影像，最吸引你的會是？
                        </div>
                        <div className="game_a btn" onClick={() => handleAnswer("A")}>
                          <div className="game_a_i">{imagesSVG.ai2_1()}</div>
                          <div className="game_a_text"><span className="yt700">YouTube</span> 上最多觀看次數的最新廣告大片</div>
                        </div>
                        <div className="game_a btn" onClick={() => handleAnswer("B")}>
                          <div className="game_a_i">{imagesSVG.ai2_2()}</div>
                          <div className="game_a_text"><span className="yt700">YouTube</span> 創作者合辦的運動會精彩實境影片</div>
                        </div>
                      </div>
                    </Slide> 

                    <Fade in={showImage} timeout={600}>
                      <div className="formula_box btn" onClick={handleHideImgAndNext}>
                        <div className="formula_t1">
                          推薦
                        </div>
                        {answers[1] === "A" && (
                          <>
                            <div className="formula_content">
                              走在潮流尖端的你
                            </div>
                            {formula06}
                          </>
                        )}
                        {answers[1] === "B" && (
                          <>
                            <div className="formula_content">
                              相信 <span className="yt700">1+1>2</span> 的你
                            </div>
                            {formula02}
                          </>
                        )}
                        {formulabottom}
                      </div>
                    </Fade> 
                  </>
                )}

                {step === 2 && answers[0] === "B" && (
                  <>
                    <Slide direction="down" timeout={400} in={true} mountOnEnter unmountOnExit>
                      <div className="game_card">
                        <div className="game_i yt700">2</div>
                        <div className="game_q">
                          打開門後，眼前有個擺滿各種唱片的音樂庫，你會選擇播放？
                        </div>
                        <div className="game_a btn" onClick={() => handleAnswer("A")}>
                          <div className="game_a_i">{imagesSVG.ai3_2()}</div>
                          <div className="game_a_text"><span className="yt700">YouTube</span> 上遊戲實況主演唱的熱血主題曲</div>
                        </div>
                        <div className="game_a btn" onClick={() => handleAnswer("B")}>
                          <div className="game_a_i">{imagesSVG.ai3_1()}</div>
                          <div className="game_a_text"><span className="yt700">YouTube</span> 上社會紀錄片的感人主題曲</div>
                        </div>
                      </div>
                    </Slide> 

                    <Fade in={showImage} timeout={600}>
                      <div className="formula_box btn" onClick={handleHideImgAndNext}>
                        <div className="formula_t1">
                          推薦
                        </div>
                        {answers[1] === "A" && (
                          <>
                            <div className="formula_content">
                              滿腔熱血的你
                            </div>
                            {formula01}
                          </>
                        )}
                        {answers[1] === "B" && (
                          <>
                            <div className="formula_content">
                              內在柔軟的你
                            </div>
                            {formula05}
                          </>
                        )}
                        {formulabottom}
                      </div>
                    </Fade> 
                  </>
                )}

                {/* * 題目-3 */}
                {step === 3 && answers[0] === "A" && answers[1] === "A" && (
                  <>
                    <Slide direction="down" timeout={400} in={true} mountOnEnter unmountOnExit>
                      <div className="game_card">
                        <div className="game_i yt700">3</div>
                        <div className="game_q">
                        往前走，抵達了創意專區，你希望透過什麼方法讓你的頻道互動最大化？
                        </div>
                        <div className="game_a btn" onClick={() => handleAnswer("A")}>
                          <div className="game_a_i">{imagesSVG.ai4_1()}</div>
                          <div className="game_a_text">以貼近在地文化方式進行 <span className="yt700">Shorts</span> 創作</div>
                        </div>
                        <div className="game_a btn" onClick={() => handleAnswer("B")}>
                          <div className="game_a_i">{imagesSVG.ai4_2()}</div>
                          <div className="game_a_text">推出跨裝置播放內容以增加頻道會員</div>
                        </div>
                      </div>
                    </Slide> 

                    <Fade in={showImage} timeout={600}>
                      <div className="formula_box btn" onClick={handleHideImgAndNext}>
                        <div className="formula_t1">
                          推薦
                        </div>
                        {answers[2] === "A" && (
                          <>
                            <div className="formula_content">
                            行動力滿分的你
                            </div>
                            {formula09}
                          </>
                        )}
                        {answers[2] === "B" && (
                          <>
                            <div className="formula_content">
                            不怕跨越舒適圈的你
                            </div>
                            {formula04}
                          </>
                        )}
                        {formulabottom}
                      </div>
                    </Fade> 
                  </>
                )}
                
                {step === 3 && answers[0] === "A" && answers[1] === "B" && (
                  <>
                    <Slide direction="down" timeout={400} in={true} mountOnEnter unmountOnExit>
                      <div className="game_card">
                        <div className="game_i yt700">3</div>
                        <div className="game_q">
                          往前走，你忽然發現左邊是擺滿各種唱片的音樂庫，你會選擇播放？
                        </div>
                        <div className="game_a btn" onClick={() => handleAnswer("A")}>
                          <div className="game_a_i">{imagesSVG.ai3_1()}</div>
                          <div className="game_a_text"><span className="yt700">YouTube</span> 上感人的公益演唱會</div>
                        </div>
                        <div className="game_a btn" onClick={() => handleAnswer("B")}>
                          <div className="game_a_i">{imagesSVG.ai3_2()}</div>
                          <div className="game_a_text"><span className="yt700">YouTube</span> 遊戲實況主演唱的熱血主題曲</div>
                        </div>
                      </div>
                    </Slide> 

                    <Fade in={showImage} timeout={600}>
                      <div className="formula_box btn" onClick={handleHideImgAndNext}>
                        <div className="formula_t1">
                          推薦
                        </div>
                        {answers[2] === "A" && (
                          <>
                            <div className="formula_content">
                            內在柔軟的你
                            </div>
                            {formula05}
                          </>
                        )}
                        {answers[2] === "B" && (
                          <>
                            <div className="formula_content">
                            滿腔熱血的你
                            </div>
                            {formula01}
                          </>
                        )}
                        {formulabottom}
                      </div>
                    </Fade> 
                  </>
                )}

                {step === 3 && answers[0] === "B" && answers[1] === "A" && (
                  <>
                    <Slide direction="down" timeout={400} in={true} mountOnEnter unmountOnExit>
                      <div className="game_card">
                        <div className="game_i yt700">3</div>
                        <div className="game_q">
                        聽完音樂後，天花板上出現了一則留言：請選擇一種工具讓影片曝光最大化，這時你會選擇？
                        </div>
                        <div className="game_a btn" onClick={() => handleAnswer("A")}>
                          <div className="game_a_i">{imagesSVG.ai5_1()}</div>
                          <div className="game_a_text">善用數據分析，找到屬於自己的觀眾</div>
                        </div>
                        <div className="game_a btn" onClick={() => handleAnswer("B")}>
                          <div className="game_a_i">{imagesSVG.ai5_2()}</div>
                          <div className="game_a_text">建立專屬頻道會員，成為明日之星</div>
                        </div>
                      </div>
                    </Slide> 

                    <Fade in={showImage} timeout={600}>
                      <div className="formula_box btn" onClick={handleHideImgAndNext}>
                        <div className="formula_t1">
                          推薦
                        </div>
                        {answers[2] === "A" && (
                          <>
                            <div className="formula_content">
                            神機妙算的你
                            </div>
                            {formula03}
                          </>
                        )}
                        {answers[2] === "B" && (
                          <>
                            <div className="formula_content">
                            行動力滿分的你
                            </div>
                            {formula09}
                          </>
                        )}
                        {formulabottom}
                      </div>
                    </Fade> 
                  </>
                )}

                {step === 3 && answers[0] === "B" && answers[1] === "B" && (
                  <>
                    <Slide direction="down" timeout={400} in={true} mountOnEnter unmountOnExit>
                      <div className="game_card">
                        <div className="game_i yt700">3</div>
                        <div className="game_q">
                          聽完音樂後，走到了工作室內的內容部門牆上投影著各種影像，你最有興趣的是？
                        </div>
                        <div className="game_a btn" onClick={() => handleAnswer("A")}>
                          <div className="game_a_i">{imagesSVG.ai6_1()}</div>
                          <div className="game_a_text"><span className="yt700">3</span> 位高中生在沙漠裡吃火鍋的現場吃播</div>
                        </div>
                        <div className="game_a btn" onClick={() => handleAnswer("B")}>
                          <div className="game_a_i">{imagesSVG.ai6_2()}</div>
                          <div className="game_a_text">召集各領域創作者一起挑戰的密室逃脫影片</div>
                        </div>
                      </div>
                    </Slide> 

                    <Fade in={showImage} timeout={600}>
                      <div className="formula_box btn" onClick={handleHideImgAndNext}>
                        <div className="formula_t1">
                          推薦
                        </div>
                        {answers[2] === "A" && (
                          <>
                            <div className="formula_content">
                            腦洞大開的你
                            </div>
                            {formula08}
                          </>
                        )}
                        {answers[2] === "B" && (
                          <>
                            <div className="formula_content">
                            領袖特質的你
                            </div>
                            {formula02}
                          </>
                        )}
                        {formulabottom}
                      </div>
                    </Fade> 
                  </>
                )}

                {/* * 題目-4 */}
                {step === 4 && answers[0] === "A" && (
                  <>
                    <Slide direction="down" timeout={400} in={true} mountOnEnter unmountOnExit>
                      <div className="game_card">
                        <div className="game_i yt700">4</div>
                        <div className="game_q">
                          抵達了旅程的尾聲，影音工作室將讓你帶走一種專屬技能，你會選擇？
                        </div>
                        <div className="game_a btn" onClick={() => handleAnswer("A")} >
                          <div className="game_a_i">{imagesSVG.ai5_1()}</div>
                          <div className="game_a_text">精準數據分析力，找到屬於自己的觀眾</div>
                        </div>
                        <div className="game_a btn" onClick={() => handleAnswer("B")}>
                          <div className="game_a_i">{imagesSVG.ai7_1()}</div>
                          <div className="game_a_text">創意腳本撰寫力，讓你一整年創意不間斷</div>
                        </div>
                      </div>
                    </Slide>

                    <Fade in={showImage} timeout={600}>
                      <div className="formula_box btn" onClick={handleHideImgAndShowFbx}>
                        <div className="formula_t1">
                          推薦
                        </div>
                        {answers[3] === "A" && (
                          <>
                            <div className="formula_content">
                            善於邏輯思考的你
                            </div>
                            {formula07}
                          </>
                        )}
                        {answers[3] === "B" && (
                          <>
                            <div className="formula_content">
                            擁有無限創意的你
                            </div>
                            {formula10}
                          </>
                        )}
                        {formulabottom}
                      </div>
                    </Fade> 
                  </>
                )}

                {step === 4 && answers[0] === "B" && (
                  <>
                    <Slide direction="down" timeout={400} in={true} mountOnEnter unmountOnExit>
                      <div className="game_card">
                        <div className="game_i yt700">4</div>
                        <div className="game_q">
                          抵達了旅程的尾聲，工作室管理員將賦予你一種專屬技能，你會選擇？
                        </div>
                        <div className="game_a btn" onClick={() => handleAnswer("A")} >
                          <div className="game_a_i">{imagesSVG.ai7_1()}</div>
                          <div className="game_a_text">頂級企劃發想力，讓你一整年創意不間斷</div>
                        </div>
                        <div className="game_a btn" onClick={() => handleAnswer("B")}>
                          <div className="game_a_i">{imagesSVG.ai7_2()}</div>
                          <div className="game_a_text">擁有個人品牌魅力，創造出有辨識度且合作邀約不斷的好內容</div>
                        </div>
                      </div>
                    </Slide>

                    <Fade in={showImage} timeout={600}>
                      <div className="formula_box btn" onClick={handleHideImgAndShowFbx}>
                        <div className="formula_t1">
                          推薦
                        </div>
                        {answers[3] === "A" && (
                          <>
                            <div className="formula_content">
                            創意不間斷的你
                            </div>
                            {formula10}
                          </>
                        )}
                        {answers[3] === "B" && (
                          <>
                            <div className="formula_content">
                            擁有獨特魅力的你
                            </div>
                            {formula06}
                          </>
                        )}
                        {formulabottom}
                      </div>
                    </Fade> 
                  </>
                )}
                </div>
              )}

              {/* 訪客資訊表單 */}
              {page === 'fbx' && (
                <Fade in={page === 'fbx'} timeout={600}>
                  <div className="fbx_box">
                    <div className="yt_red">
                      {imagesSVG.y()}
                    </div>
                    <div className="yt_white">
                      {imagesSVG.yt()}
                    </div>
                    <div className="fbx_title_en yt900">
                      register
                    </div>
                    <div className="fbx_title_tc">
                      請登記你的訪客資訊
                    </div>
                    <div className="fbx_title_intro">
                      協助影音工作室提供更詳細的 <span className="yt400">DNA</span> 報告書
                    </div>
                    <div className="fbx_form_container">
                      {/* 暱稱 */}
                      <div className="fbx_form_question">
                        <TextField onChange={handleChangeName} className="fbx_form_textInput" id="standard-basic" label="你的暱稱是" variant="standard"/>
                      </div>
                      {/* 性別 */}
                      <div className="fbx_form_question">
                        <FormControl className="fbx_form_textInput" variant="standard" >
                          <InputLabel id="demo-simple-select-standard-label">你的性別</InputLabel>
                          <Select
                            className="fbx_form_select"
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={gender}
                            onChange={handleChangeGender}
                            label="你的性別"
                          >
                            <MenuItem value={"男性"} style={{color:"#0F0F0F"}}>男性</MenuItem>
                            <MenuItem value={"女性"} style={{color:"#0F0F0F"}}>女性</MenuItem>
                            <MenuItem value={"非二元性別"} style={{color:"#0F0F0F"}}>非二元性別</MenuItem>
                            <MenuItem value={"不願意提供"} style={{color:"#0F0F0F"}}>不願意提供</MenuItem>
                          </Select>
                        </FormControl> 
                      </div> 
                      {/* 年齡 */}
                      <div className="fbx_form_question">
                        <FormControl className="fbx_form_textInput" variant="standard" >
                          <InputLabel id="demo-simple-select-standard-label">你的年齡</InputLabel>
                          <Select
                            className="fbx_form_select"
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={age}
                            onChange={handleChangeAge}
                            label="你的年齡"
                          >
                            <MenuItem value={"20 歲以下"} style={{color:"#0F0F0F"}}>20 歲以下</MenuItem>
                            <MenuItem value={"21 - 30 歲"} style={{color:"#0F0F0F"}}>21 - 30 歲</MenuItem>
                            <MenuItem value={"31 - 40 歲"} style={{color:"#0F0F0F"}}>31 - 40 歲</MenuItem>
                            <MenuItem value={"41 - 50 歲"} style={{color:"#0F0F0F"}}>41 - 50 歲</MenuItem>
                            <MenuItem value={"51 - 60 歲"} style={{color:"#0F0F0F"}}>51 - 60 歲</MenuItem>
                            <MenuItem value={"60 歲以上"} style={{color:"#0F0F0F"}}>60 歲以上</MenuItem>
                            <MenuItem value={"不願意提供"} style={{color:"#0F0F0F"}}>不願意提供</MenuItem>
                          </Select>
                        </FormControl> 
                      </div> 
                      {/* 職業別 */}
                      <div className="fbx_form_question">
                        <FormControl className="fbx_form_textInput" variant="standard" >
                          <InputLabel id="demo-simple-select-standard-label">你的職業別</InputLabel>
                          <Select
                            className="fbx_form_select"
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={job}
                            onChange={handleChangeJob}
                            label="你的職業別"
                          >
                            <MenuItem value={"B2B"} style={{color:"#0F0F0F"}}>B2B</MenuItem>
                            <MenuItem value={"電商產業"} style={{color:"#0F0F0F"}}>電商產業</MenuItem>
                            <MenuItem value={"消費品產業"} style={{color:"#0F0F0F"}}>消費品產業</MenuItem>
                            <MenuItem value={"科技與資訊業"} style={{color:"#0F0F0F"}}>科技與資訊業</MenuItem>
                            <MenuItem value={"金融業"} style={{color:"#0F0F0F"}}>金融業</MenuItem>
                            <MenuItem value={"教育業"} style={{color:"#0F0F0F"}}>教育業</MenuItem>
                            <MenuItem value={"醫療產業"} style={{color:"#0F0F0F"}}>醫療產業</MenuItem>
                            <MenuItem value={"汽車產業"} style={{color:"#0F0F0F"}}>汽車產業</MenuItem>
                            <MenuItem value={"電信產業"} style={{color:"#0F0F0F"}}>電信產業</MenuItem>
                            <MenuItem value={"媒體娛樂業"} style={{color:"#0F0F0F"}}>媒體娛樂業</MenuItem>
                            <MenuItem value={"遊戲產業"} style={{color:"#0F0F0F"}}>遊戲產業</MenuItem>
                            <MenuItem value={"旅遊業"} style={{color:"#0F0F0F"}}>旅遊業</MenuItem>
                            <MenuItem value={"不動產業"} style={{color:"#0F0F0F"}}>不動產業</MenuItem>
                            <MenuItem value={"服務業"} style={{color:"#0F0F0F"}}>服務業 (含零售與餐飲)</MenuItem>
                            <MenuItem value={"製造業"} style={{color:"#0F0F0F"}}>製造業</MenuItem>
                            <MenuItem value={"政府機關"} style={{color:"#0F0F0F"}}>政府機關</MenuItem>
                            <MenuItem value={"其他產業"} style={{color:"#0F0F0F"}}>其他產業</MenuItem>
                          </Select>
                        </FormControl> 
                      </div> 
                    </div>
                    {showErrorMessage &&
                      <div className="errorMsg">
                        ※請填寫完整資訊
                      </div>
                    }
                    <div className="fbx_btn btn" onClick={handleSubmit}>
                      <span className="fbx_btn_text" >產出報告</span>
                    </div>
                  </div>
                </Fade>
              )}
            
              {page === 'loading' && (
                <>
                  <Fade in={page === 'loading'} timeout={600}>
                    <div className="result_loading_box">
                      {/* <Lottie
                        className="result_loading_lottie"
                        animationData={lottie_loading}
                        loop={false}
                        options={lottieOptions} 
                    /> */}
                      <img className="result_loading_lottie" src="https://oss.uppmkt.com/202308/ytfg/loadingandtransit_m.gif" alt="" />
                      <Lottie
                        className="result_yt_lottie"
                        animationData={lottie_yt}
                        loop={false}
                      />
                    </div>
                  </Fade>
                  <Fade in={showResult} timeout={600}>
                    <div className="result_bg">
                      <a className="btn" 
                            href={`images/result/${answers.slice(0, -1).join('')}.png`} 
                            download
                            onTouchCancel={patchDownloadTouchCancle}
                            onTouchEnd={patchDownloadTouchEnd}
                            onClick={patchDownloadClick}
                      >
                          <img  className="result_resultImg btn"
                            src={`images/result/${answers.slice(0, -1).join('')}.png`} alt=""
                          />      
                      </a>
                      <div className="result_top">
                        {imagesSVG.add()}
                          點擊或長按儲存圖片分享給朋友看看
                        {imagesSVG.add()}
                      </div>
                      <div className="result_container">
                        <div className="result_box">
                          <div className="result_icon">
                            {imagesSVG[`icon_${answers.slice(0, -1).join('')}`]()}
                          </div>
                          {name &&
                            <div className="result_name">
                                {name}
                            </div>
                          }
                          <div className="result_content">
                            {imagesSVG[answers.slice(0, -1).join('')]()}
                          </div>
                        </div>
                        <AnchorLink href='#more'>
                          <div className="result_more">
                            還有精彩的在後面...
                            {imagesSVG.down()}
                          </div>
                        </AnchorLink>
                        <div className="result_more_container" id='more'>
                          <div className="result_more_box">
                            <div className="result_more_en yt900">
                              SPECIAL SURPRISE!
                            </div>
                            <div className="result_more_tc">
                              神秘彩蛋
                            </div>
                            <div className="result_more_text">
                              偷偷告訴你...<br/>於活動後填回饋問卷就能於展覽結束時<br/>使用本次活動限定拍貼機喔！
                            </div>
                            <div className="result_more_photo">
                              <img src="https://oss.uppmkt.com/202308/ytfg/photo.png" alt=""/>
                            </div>
                          </div>
                          <div className="result_more_end">
                            現在準備好你的手機，前往 <span className="yt600">YouTube Creator</span> 展間
                            <br/>盡情拍照 <span className="yt600">#YouTube</span> 年度盛典 大力分享！
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fade>
                </>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
