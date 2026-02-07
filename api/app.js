import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session"; 
import { Issuer, generators } from "openid-client"; 
import serverless from "serverless-http"; 
import postRoute from "./routes/post.route.js";
import userRoute from "./routes/user.route.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// 1. Session 配置
app.use(session({
    secret: process.env.SESSION_SECRET || 'coffeecan_secret',
    resave: false,
    saveUninitialized: false
}));

// 2. 初始化 Cognito Client
let client;
const initializeClient = async () => {
    // 检查必要的环境变量，防止报错
    if (!process.env.COGNITO_USER_POOL_ID) {
        console.log("COGNITO_USER_POOL_ID not exist")
        return;
    }

    //https://cognito-idp.us-east-1.amazonaws.com/us-east-1_XGwHalWEj/.well-known/jwks.json

    const issuer = await Issuer.discover(`https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`);
    client = new issuer.Client({
        client_id: process.env.COGNITO_CLIENT_ID,
        client_secret: process.env.COGNITO_CLIENT_SECRET, 
        redirect_uris: [process.env.REDIRECT_URI],
        response_types: ['code']
    });
};
initializeClient().catch(console.error);

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// 3. 登录路由
app.get("/api/auth/login", (req, res) => {
    if (!client) return res.status(500).send("Cognito client not initialized");
    const nonce = generators.nonce();
    const state = generators.state();
    req.session.nonce = nonce;
    req.session.state = state;

    const authUrl = client.authorizationUrl({
        scope: 'openid email phone',
        state: state,
        nonce: nonce,
    });
    res.redirect(authUrl);
});

// 4. 回调路由
app.get("/api/auth/callback", async (req, res) => {
    try {
        const params = client.callbackParams(req);
        const tokenSet = await client.callback(process.env.REDIRECT_URI, params, {
            nonce: req.session.nonce,
            state: req.session.state
        });
        const userInfo = await client.userinfo(tokenSet.access_token);
        req.session.userInfo = userInfo; 
        res.redirect(process.env.CLIENT_URL); 
    } catch (err) {
        console.error(err);
        res.redirect(process.env.CLIENT_URL + "/login");
    }
});

app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);

// --- 关键改动点 ---

// A. 导出给 Lambda 使用
export const handler = serverless(app);

// B. 仅在非 Lambda 环境（本地开发）下监听端口
if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const PORT = 8800; // 与你之前的端口保持一致
    app.listen(PORT, () => {
        console.log(`Server is running locally on http://localhost:${PORT}`);
    });
}