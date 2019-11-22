# 餐廳清單_CRUD_finish

學期3 A14:完成餐廳清單

## 功能列表

- 使用者可以email和自訂密碼註冊登入，也可藉由facebook快速註冊、登入
- 使用者可收藏專屬餐廳清單
- 首頁列出餐廳卡片，Edit按鈕可修改資訊，點選卡片或Detail按鈕可查看詳細資訊，點選Delete可刪除餐廳
- 點選卡片展示區之＋號後，可新增餐廳資訊
- 首頁及詳細資訊頁面皆可點選編輯按鈕進入編輯模式，編輯完成點選save按鈕或放棄編輯點選cancel按鈕後，導回前一頁
- 首頁及詳細資訊頁面皆可刪除餐廳卡片，點擊刪除按鈕後，呈現警語頁面，使用者可再度確認是否刪除
- 可搜尋餐廳中英文名稱及餐廳類型關鍵字
- 可依字母順序、類別、地區或評分高低排序

## 環境建置
1. MongoDB v4.0以上
2. Node.js

## 專案安裝流程
1. 開啟terminal，將此專案clone至本機

```
git clone https://github.com/StephHan232430/S3A14_restaurant_list_finish.git
```

2. 進入專案資料夾

```
cd S3A14_restaurant_list_finish
```

3. 安裝專案所需套件

```
npm install
```

4. 進入 /models/seeds 資料夾，於terminal輸入指令匯入種子資料

```
node seeder.js
```

5. 輸入後待terminal出現db connected! 即表示種子資料已新增至資料庫

6. 執行專案
```
npm run dev
```

7. 開啟網頁瀏覽器，於網址列輸入
```
http://localhost:3000
```

## 測試帳號

| Name  | Email             | Password |
| :---: | :---------------: |:--------:|
| user1 | user1@example.com | 12345678 |
| user2 | user2@example.com | 12345678 |

## 使用工具

- [bcryptjs v2.4.3](https://www.npmjs.com/package/bcryptjs)
- [body-parser v1.19.0](https://www.npmjs.com/package/body-parser)
- [connect-flash v0.1.1](https://www.npmjs.com/package/connect-flash)
- [dotenv v8.2.0](https://www.npmjs.com/package/dotenv)
- [express v4.17.1](https://expressjs.com/zh-tw/)
- [express-Handlebars v3.1.0](https://github.com/ericf/express-handlebars)
- [express-session v1.17.0](https://www.npmjs.com/package/express-session)
- [method-override v3.0.0](https://www.npmjs.com/package/method-override)
- [MongoDB Community Server v4.0.13](https://www.mongodb.com/download-center/community)
- [Mongoose v5.7.10](https://www.npmjs.com/package/mongoose)
- [mongoose-type-url v1.0.6](https://www.npmjs.com/package/mongoose-type-url)
- [Node.js v12.13.0](https://nodejs.org/en/)
- [passport v0.4.0](https://www.npmjs.com/package/passport)
- [passport-facebook v3.0.0](https://www.npmjs.com/package/passport-facebook)
- [passport-local v1.0.0](https://www.npmjs.com/package/passport-local)
- [Visual Studio Code v1.39.2](https://code.visualstudio.com/)