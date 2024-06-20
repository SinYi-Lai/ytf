## YouTube Festival 年度盛典 - 互動遊戲網站
###  [🔗 前往遊戲網站](https://sinyi-lai.github.io/ytf/ "Go YouTube DNA!")

>透過展覽內限定「尋找專屬於自己的影音 DNA」遊戲，參與者將在 YouTube Works Award 優秀得獎廣告中探索並挖掘創作潛力，並從鑑定測驗展現參與者的創作領域，找到最符合自己的 YouTube DNA。

[![image](https://s3.amazonaws.com/prod-newsleopard-upload-img/4028814380bbe5b20181095a3bce1bc8/2024-06-20-07-15-15-Frame+1725.png)](https://sinyi-lai.github.io/ytf/)
### 💡 技術內容說明
- 引入 Bootstrap 及 MUI：進度條、淡入淡出、表單樣式
- 使用 lottie-react ：引入 lottie json 檔案，控制動畫
- 引入 timeme.js：紀錄互動時間
- 使用 useState 用不同的 State 控制顯示各個題目的畫面、動畫、存取資料
- 使用 useEffect 當答案陣列長度不同時啟動不同的 function 並將最終資料傳送到資料庫
- 在 head 中埋入 Google tag (gtag.js)，用以追蹤網頁流量及行為數據
