# restaurant_list
本專案用於練習Node.js 中的 Express 框架及樣板引擎（使用handlebars)、CRUD操作、登陸策略練習（使用passport)，專案的畫面及主要功能如下：
## 專案畫面
![](https://i.imgur.com/XqqW98N.png)
![](https://i.imgur.com/fWoyoIW.jpg)
![](https://i.imgur.com/Aun9vOT.jpg)
![](https://i.imgur.com/IKG68sf.png)
![](https://i.imgur.com/RhC7SON.jpg)

## 主要功能

*  使用者能透過平台註冊帳號
*  使用者能透過FB、Google註冊帳號
*  使用者能登陸帳號，並使用自己的資料(CRUD)
* 主頁列有所有的餐廳，並能依照特定條件篩選排序餐廳
* 使用者能點擊觀看每間餐廳的詳細資料
* 使用者能新增餐廳
* 使用者能更新自己的餐廳資料
* 使用者能刪除自己的餐廳
* 詳細資料中附有餐廳的Google Map
* 使用者可以藉由搜尋餐廳名稱、類別來找餐廳
* 如果找不到結果，會提供能點選的關鍵字欄，點擊以後會出現該結果

## 環境
Node.js v10.15.0

## Dependencies
express 4.17.1,
express-handlebars 5.3.2

## 安裝
1. 打開你的 terminal，Clone 此專案至本機電腦
<br>git clone https://github.com/JHIH-LEI/restaurant_list

2. 開啟終端機(Terminal)，進入存放此專案的資料夾
<br>cd restaurant_list

3. 安裝 npm 套件
<br>在 Terminal 輸入 npm install 指令

4. 下載種子資料
<br>在 Terminal 輸入 npm run seed

5. 啟動伺服器
<br>npm run dev
當 terminal 出現以下字樣，表示成功連結本地伺服器：
![](https://i.imgur.com/oEWjxMI.png)

